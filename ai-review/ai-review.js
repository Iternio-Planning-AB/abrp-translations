const { Octokit } = require('@octokit/rest');
const core = require('@actions/core');
const github = require('@actions/github');
const {
  ignoredRegex,
  filterDiffByIgnoredFiles,
  getLineNumber,
  getNestedValue,
  parseTranslationChangesFromDiff,
} = require('./utils');

// Get GitHub context and inputs
const context = github.context;
const owner = context.repo.owner;
const repo = context.repo.repo;

const PR_NUMBER = process.env.PR_NUMBER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const AZURE_OPEN_AI_SECRET = process.env.AZURE_OPEN_AI_SECRET;
const AZURE_OPEN_AI_URL = process.env.AZURE_OPEN_AI_URL;
const AZURE_OPEN_AI_DEPLOYMENT = process.env.AZURE_OPEN_AI_DEPLOYMENT;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

const getPullRequestDiff = async () => {
  // Get PR details
  const { data: pr } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: PR_NUMBER,
  });

  // Get diff using Octokit's request method with diff media type
  const diffResponse = await octokit.request(`GET /repos/${owner}/${repo}/pulls/${PR_NUMBER}`, {
    mediaType: {
      format: 'diff',
    },
  });

  return {
    diff: diffResponse.data || '',
    title: pr.title,
    description: pr.body || '',
    commit: pr.head.sha,
  };
};

const SYSTEM_PROMPT = {
  role: 'system',
  content: `You are an expert translator and localization specialist. You review translations for an EV route planner and navigation app (A Better Routeplanner / ABRP).

Your task is to review translation changes and provide feedback in a specific JSON format. Always respond with valid JSON only - no markdown, no explanations outside the JSON.`,
};

const getUserPrompt = (title, description, changedTranslations) => {
  return {
    role: 'user',
    content: `Review the translation changes below. Follow these rules strictly:

## What to Review
1. Translation accuracy - does the translation convey the same meaning as the English source?
2. Grammar and spelling errors in the translation
3. Consistency - are similar terms translated consistently?
4. Placeholder preservation - are {{placeholders}} kept intact and not translated?
5. Pluralization rules - are plural forms correct for the target language?
6. Context appropriateness - is the translation suitable for an EV route planner app?
7. Untranslated content - is there English text left untranslated that should be translated?

## What NOT to Review
1. The English source text (only review the translations)
2. Minor stylistic preferences that don't affect meaning
3. Positive feedback - only report problems
4. Formatting/whitespace issues that don't affect the meaning

## Output Format
Respond with ONLY a JSON object in this exact structure:
{
  "summary": "Brief 1-2 sentence summary of findings, or 'No significant issues found.' if none",
  "issues": [
    {
      "filePath": "xx.json",
      "lineContent": "exact line content to match in the file",
      "comment": "Brief explanation of the issue"
    }
  ]
}

## lineContent Rules (IMPORTANT for line matching)
The lineContent field is used to find the exact line number in the file. Follow these rules:
1. Use the EXACT line as it appears in the "line" field of the changed translations
2. Include the full line with the key and value, e.g.: "  \\"key\\": \\"translated value\\","
3. Do NOT paraphrase or modify the line content

## GitHub Suggestions
When you can propose a better translation, use GitHub's suggestion syntax in the comment field:
\`\`\`suggestion
  "key": "improved translation",
\`\`\`

IMPORTANT: Preserve the EXACT indentation (2 spaces) and include the trailing comma if present in the original.

Example:
{
  "filePath": "de.json",
  "lineContent": "  \\"starting_point\\": \\"Startpunkttt\\",",
  "comment": "Typo in German translation:\n\`\`\`suggestion\n  \\"starting_point\\": \\"Startpunkt\\",\n\`\`\`"
}

Only use suggestions when you have a specific improvement. For general issues without a clear fix, just explain the problem.

If there are no issues, return: {"summary": "No significant issues found.", "issues": []}

${title ? `## PR Title\n${title}\n\n` : ''}${description ? `## PR Description\n${description}\n\n` : ''}## Changed Translations
${JSON.stringify(changedTranslations, null, 2)}`,
  };
};

// Handle both quoted and unquoted paths in git diff headers
// Use ^ with multiline flag to only match actual diff headers at start of lines,
// not strings inside file contents that happen to look like diff headers
const pathRegex = /^diff --git "?a\/(.+?)"? "?b\/(.+?)"?\n(?!deleted file mode)/gm;

/**
 * Fetch a single file's content from the repository.
 */
const getFileContent = async (path, commit) => {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: commit,
    });

    if (data.type === 'file' && data.encoding === 'base64') {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    } else if (data.type === 'file' && typeof data.content === 'string') {
      return data.content;
    }
    return null;
  } catch (err) {
    console.error(`Failed to get content for ${path}`, err);
    return null;
  }
};

/**
 * Get the content of all touched translation files (for line number detection).
 */
const getTouchedFilesContent = async (diff, commit) => {
  const files = [];
  let match;
  // Reset regex state
  pathRegex.lastIndex = 0;
  while ((match = pathRegex.exec(diff)) !== null) {
    const path = match[2].replace(/^"|"$/g, '');
    if (ignoredRegex.test(path)) {
      continue;
    }
    // Only include JSON translation files
    if (path.endsWith('.json')) {
      files.push(path);
    }
  }

  const fileContents = await Promise.all(
    files.map(async (path) => {
      const content = await getFileContent(path, commit);
      return { path, content };
    })
  );

  return fileContents.filter((file) => file.content !== null);
};

/**
 * Get English translations as the reference source.
 */
const getEnglishTranslations = async (commit) => {
  const content = await getFileContent('en.json', commit);
  if (!content) {
    console.warn('Could not fetch en.json for reference');
    return {};
  }
  try {
    return JSON.parse(content);
  } catch (err) {
    console.error('Failed to parse en.json', err);
    return {};
  }
};

const createPrompt = (title, description, changedTranslations) => {
  const messages = [SYSTEM_PROMPT, getUserPrompt(title, description, changedTranslations)];

  console.log(`Found ${changedTranslations.length} changed translations to review`);
  console.log('Requesting translation review...');

  return { messages };
};

const axios = require('axios');

const requestReview = async () => {
  const { diff, title, description, commit } = await getPullRequestDiff();
  const filteredDiff = filterDiffByIgnoredFiles(diff);

  // Get English translations for reference (full file needed for lookups,
  // but only modified keys' English values are sent to the AI)
  const englishTranslations = await getEnglishTranslations(commit);
  const totalEnglishKeys = Object.keys(englishTranslations).length;

  // Parse changed translations from the diff - only extracts modified keys
  // and looks up their corresponding English values
  const changedTranslations = parseTranslationChangesFromDiff(filteredDiff, englishTranslations);

  console.log(`Loaded ${totalEnglishKeys} English keys, using ${changedTranslations.length} for context`);

  if (changedTranslations.length === 0) {
    console.log('No translation changes found in the diff');
    return { review: { summary: 'No translation changes found.', issues: [] }, fileContents: [] };
  }

  // Get file contents for line number detection (not sent to AI)
  const fileContents = await getTouchedFilesContent(filteredDiff, commit);

  const prompt = createPrompt(title, description, changedTranslations);

  // Construct Azure OpenAI URL from secrets
  const openAiUrl = `${AZURE_OPEN_AI_URL}/openai/deployments/${AZURE_OPEN_AI_DEPLOYMENT}/chat/completions?api-version=2024-12-01-preview`;

  const config = {
    method: 'post',
    maxBodyLength: Number.POSITIVE_INFINITY,
    url: openAiUrl,
    headers: {
      'api-key': AZURE_OPEN_AI_SECRET,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(prompt),
  };

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        const review = response.data.choices[0].message.content;
        console.log('OpenAI Usage statistics', response.data.usage);

        try {
          const json = JSON.parse(review);
          resolve({ review: json, fileContents });
        } catch (error) {
          console.error('Failed to JSON.parse review', review);
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteCommentsByUser = async (username) => {
  try {
    // Step 1: List all review comments (inline comments) on the pull request
    const reviewCommentsResponse = await octokit.pulls.listReviewComments({
      owner,
      repo,
      pull_number: PR_NUMBER,
    });

    // Step 2: List all issue comments (general comments) on the pull request
    const issueCommentsResponse = await octokit.issues.listComments({
      owner,
      repo,
      issue_number: PR_NUMBER,
    });

    const reviewComments = reviewCommentsResponse.data || [];
    const issueComments = issueCommentsResponse.data || [];

    // Step 3: Filter comments by the specific user
    const userReviewComments = reviewComments.filter((comment) => comment.user.login === username);
    const userIssueComments = issueComments.filter((comment) => comment.user.login === username);

    // Step 4: Delete each review comment made by that user
    await Promise.allSettled(
      userReviewComments.map((comment) =>
        octokit.pulls.deleteReviewComment({
          owner,
          repo,
          comment_id: comment.id,
        })
      )
    );

    // Step 5: Delete each issue comment made by that user
    await Promise.allSettled(
      userIssueComments.map((comment) =>
        octokit.issues.deleteComment({
          owner,
          repo,
          comment_id: comment.id,
        })
      )
    );

    const totalDeleted = userReviewComments.length + userIssueComments.length;
    if (totalDeleted > 0) {
      console.log(
        `Deleted ${totalDeleted} comments by user ${username} (${userReviewComments.length} review comments, ${userIssueComments.length} issue comments)`
      );
    }
  } catch (error) {
    console.error('Failed to delete comments by user', error);
  }
};

const getReviewAndSendToGitHub = async () => {
  return requestReview()
    .then(async ({ review, fileContents }) => {
      // log review for debugging purposes
      console.log('Review:\n', review);

      // Get PR details to get the base and head commits for inline comments
      const { data: pr } = await octokit.pulls.get({
        owner,
        repo,
        pull_number: PR_NUMBER,
      });

      review.issues?.forEach((element) => {
        const filePath = element.filePath;
        const fileContent = fileContents.find((file) => file.path === filePath);
        if (fileContent) {
          try {
            const lineNumber = getLineNumber(fileContent.content, element.lineContent);
            if (lineNumber === -1) {
              // Line not found in file - attach the code to the comment
              element.comment = `${element.comment}\n${filePath}:\n\`\`\`\n${element.lineContent}\n\`\`\``;
            }
            element.lineNumber = lineNumber;
          } catch (error) {
            console.error(
              `Failed to get line number for:\n${element.lineContent}\nError:\n`,
              error
            );
          }
        }
      });

      // Delete previous comments by the bot
      await deleteCommentsByUser('github-actions[bot]');

      console.log('Creating comments...');

      try {
        if (review.issues?.length) {
          // Group comments by file for batch processing
          const commentsByFile = {};
          review.issues.forEach(({ filePath, lineNumber, comment }) => {
            if (!commentsByFile[filePath]) {
              commentsByFile[filePath] = [];
            }
            commentsByFile[filePath].push({ lineNumber, comment });
          });

          // Create inline comments for each file
          for (const [filePath, comments] of Object.entries(commentsByFile)) {
            for (const { lineNumber, comment } of comments) {
              if (lineNumber === -1) {
                // Create a general comment on the PR
                await octokit.issues.createComment({
                  owner,
                  repo,
                  issue_number: PR_NUMBER,
                  body: comment,
                });
              } else {
                // Create an inline review comment
                // GitHub requires side: 'RIGHT' for comments on the PR branch
                try {
                  await octokit.pulls.createReviewComment({
                    owner,
                    repo,
                    pull_number: PR_NUMBER,
                    body: comment,
                    commit_id: pr.head.sha,
                    path: filePath,
                    line: lineNumber,
                    side: 'RIGHT',
                  });
                } catch (error) {
                  console.error(
                    `Failed to create inline comment for ${filePath}:${lineNumber}`,
                    error
                  );
                  // Fallback to general comment if inline fails
                  await octokit.issues.createComment({
                    owner,
                    repo,
                    issue_number: PR_NUMBER,
                    body: `${filePath}:${lineNumber}\n\n${comment}`,
                  });
                }
              }
            }
          }
        }

        // Create summary comment
        await octokit.issues.createComment({
          owner,
          repo,
          issue_number: PR_NUMBER,
          body: review.summary,
        });
      } catch (error) {
        console.error('failed to create comment', error);
        core.setFailed(`Failed to create comments: ${error.message}`);
      }
    })
    .catch((error) => {
      console.error('failed to query review', error.message);
      core.setFailed(`Failed to get review: ${error.message}`);
      return;
    });
};

// Main execution
if (require.main === module) {
  getReviewAndSendToGitHub();
}

module.exports = { getReviewAndSendToGitHub };
