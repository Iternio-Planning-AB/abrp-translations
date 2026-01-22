const IGNORED_FILES = ['package.json', 'package-lock.json', 'yarn.lock'];
const ignoredRegex = new RegExp(
  `^(${IGNORED_FILES.join(
    '|'
  )})$|^node_modules/`
);

/**
 * Removes entire diff sections for files matching the ignore patterns.
 * Keeps any text before the first diff header intact.
 * GitHub uses unified diff format: "diff --git a/path b/path"
 * Paths may be quoted when they contain special characters: "diff --git "a/path" "b/path""
 */
const filterDiffByIgnoredFiles = (diff) => {
  if (!diff) return diff;
  // Handle both quoted and unquoted paths in git diff headers
  const headerRegex = /^diff --git "?a\/(.+?)"? "?b\/(.+?)"?$/gm;
  const matches = [];
  let m;
  while ((m = headerRegex.exec(diff)) !== null) {
    // Strip any remaining quotes from the path
    const path = m[2].replace(/^"|"$/g, '');
    matches.push({ index: m.index, path });
  }
  if (matches.length === 0) return diff;

  let result = '';
  if (matches[0].index > 0) {
    result += diff.slice(0, matches[0].index);
  }
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : diff.length;
    const path = matches[i].path;
    if (!ignoredRegex.test(path)) {
      result += diff.slice(start, end);
    }
  }
  return result;
};

/**
 * Escapes special regex characters and converts whitespace sequences
 * to flexible whitespace matchers for fuzzy line matching.
 */
const convertToRegexPattern = (input) => {
  return input
    .replace(/([.*+?^=!:${}()|[\]/-])/g, '\\$1') // Escape special characters including hyphen
    .replace(/\s+/g, '\\s+'); // Replace whitespace sequences with \s+
};

/**
 * Finds the line number of a search string in text.
 * Returns the 1-based line number of the LAST line of the match,
 * which is what GitHub expects for inline comments on multi-line code.
 *
 * @param {string} text - The full file content to search in
 * @param {string} searchString - The code snippet to find (can be multi-line)
 * @returns {number} 1-based line number of the last line of the match, or -1 if not found
 */
function getLineNumber(text, searchString) {
  if (!text || !searchString) {
    return -1;
  }

  const regexPattern = convertToRegexPattern(searchString);
  const regex = new RegExp(regexPattern);
  const match = regex.exec(text);

  if (!match) {
    return -1;
  }

  // Calculate line number from match position
  // Count newlines before the match start to get 1-based start line
  const textBeforeMatch = text.substring(0, match.index);
  const startLine = textBeforeMatch.split('\n').length;

  // Count lines in the matched text to find the last line
  const matchedLineCount = match[0].split('\n').length;

  // Return the last line of the match (1-based)
  return startLine + matchedLineCount - 1;
}

/**
 * Get a nested value from an object using a dot-separated key or direct key.
 */
const getNestedValue = (obj, key) => {
  if (!obj) return undefined;

  // First try direct key
  if (obj[key] !== undefined) {
    return typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]);
  }

  // Then try dot notation for nested keys
  const parts = key.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : JSON.stringify(current);
};

/**
 * Parse the diff to extract changed translation entries.
 * Returns an array of { file, key, value, englishValue, line } objects.
 */
const parseTranslationChangesFromDiff = (diff, englishTranslations) => {
  const changes = [];

  // Split diff by file
  const fileSections = diff.split(/^diff --git/m).filter(Boolean);

  for (const section of fileSections) {
    // Extract filename from first line - match pattern like " a/de.json b/de.json" or " "a/zh-CN.json" "b/zh-CN.json""
    const firstLine = section.split('\n')[0];
    // Match the b/ path (destination) - handles both quoted and unquoted paths
    const fileMatch = firstLine.match(/\s+"?b\/([^"\s]+\.json)"?\s*$/);
    if (!fileMatch) continue;

    const filePath = fileMatch[1];

    // Skip non-translation files and en.json (source file)
    if (!filePath.endsWith('.json') || filePath === 'en.json') continue;

    // Find all added lines (lines starting with +, but not +++ header)
    const lines = section.split('\n');
    for (const line of lines) {
      // Match added lines that contain translation key-value pairs
      if (line.startsWith('+') && !line.startsWith('+++')) {
        const content = line.slice(1); // Remove the leading +

        // Match JSON key-value pairs like: "key": "value" or "key": { for nested
        const kvMatch = content.match(/^\s*"([^"]+)":\s*"(.*)"/);
        if (kvMatch) {
          const [, key, value] = kvMatch;
          const englishValue = getNestedValue(englishTranslations, key);

          changes.push({
            file: filePath,
            key,
            value,
            englishValue: englishValue || '(no English source found)',
            line: content,
          });
        }
      }
    }
  }

  return changes;
};

module.exports = {
  IGNORED_FILES,
  ignoredRegex,
  filterDiffByIgnoredFiles,
  convertToRegexPattern,
  getLineNumber,
  getNestedValue,
  parseTranslationChangesFromDiff,
};
