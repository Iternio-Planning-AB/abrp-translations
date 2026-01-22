const {
  getLineNumber,
  convertToRegexPattern,
  filterDiffByIgnoredFiles,
  parseTranslationChangesFromDiff,
  getNestedValue,
} = require('./utils');

describe('ai-review translation parsing tests', () => {
  describe('getNestedValue', () => {
    const translations = {
      simple_key: 'Simple value',
      nested: {
        child: 'Nested value',
        deep: {
          key: 'Deep nested value',
        },
      },
      charger: {
        zero: 'No charges',
        one: 'One charge',
        other: '{{count}} charges',
      },
    };

    it('should get a simple top-level key', () => {
      expect(getNestedValue(translations, 'simple_key')).toBe('Simple value');
    });

    it('should return undefined for non-existent key', () => {
      expect(getNestedValue(translations, 'non_existent')).toBeUndefined();
    });

    it('should return undefined for null/undefined object', () => {
      expect(getNestedValue(null, 'key')).toBeUndefined();
      expect(getNestedValue(undefined, 'key')).toBeUndefined();
    });

    it('should get nested value using dot notation', () => {
      expect(getNestedValue(translations, 'nested.child')).toBe('Nested value');
    });

    it('should get deeply nested value', () => {
      expect(getNestedValue(translations, 'nested.deep.key')).toBe('Deep nested value');
    });

    it('should return stringified object for non-string values', () => {
      const result = getNestedValue(translations, 'charger');
      expect(result).toBe(JSON.stringify(translations.charger));
    });
  });

  describe('parseTranslationChangesFromDiff', () => {
    const englishTranslations = {
      starting_point: 'Starting point',
      ending_point: 'The end of your trip',
      settings: 'Settings',
      charger: {
        zero: 'No charges',
        one: 'One charge',
      },
    };

    it('should parse simple translation changes', () => {
      const diff = `diff --git a/de.json b/de.json
index 123..456 789
--- a/de.json
+++ b/de.json
@@ -1,3 +1,3 @@
 {
-  "starting_point": "Startpunkttt",
+  "starting_point": "Startpunkt",
   "ending_point": "Ende der Reise"
 }`;

      const result = parseTranslationChangesFromDiff(diff, englishTranslations);
      expect(result).toHaveLength(1);
      expect(result[0].file).toBe('de.json');
      expect(result[0].key).toBe('starting_point');
      expect(result[0].value).toBe('Startpunkt');
      expect(result[0].englishValue).toBe('Starting point');
      expect(result[0].line).toBe('  "starting_point": "Startpunkt",');
    });

    it('should skip en.json (source file)', () => {
      const diff = `diff --git a/en.json b/en.json
--- a/en.json
+++ b/en.json
@@ -1,3 +1,3 @@
 {
+  "new_key": "New value",
 }`;

      const result = parseTranslationChangesFromDiff(diff, englishTranslations);
      expect(result).toHaveLength(0);
    });

    it('should handle multiple files', () => {
      const diff = `diff --git a/de.json b/de.json
--- a/de.json
+++ b/de.json
@@ -1,3 +1,3 @@
+  "starting_point": "Startpunkt",
diff --git a/fr.json b/fr.json
--- a/fr.json
+++ b/fr.json
@@ -1,3 +1,3 @@
+  "starting_point": "Point de départ",`;

      const result = parseTranslationChangesFromDiff(diff, englishTranslations);
      expect(result).toHaveLength(2);
      expect(result[0].file).toBe('de.json');
      expect(result[1].file).toBe('fr.json');
    });

    it('should handle missing English translation', () => {
      const diff = `diff --git a/de.json b/de.json
--- a/de.json
+++ b/de.json
+  "unknown_key": "Unbekannt",`;

      const result = parseTranslationChangesFromDiff(diff, englishTranslations);
      expect(result).toHaveLength(1);
      expect(result[0].englishValue).toBe('(no English source found)');
    });

    it('should skip non-JSON files', () => {
      const diff = `diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
+  "not_a_translation": "value",`;

      const result = parseTranslationChangesFromDiff(diff, englishTranslations);
      expect(result).toHaveLength(0);
    });

    it('should only capture added lines (not removed)', () => {
      const diff = `diff --git a/de.json b/de.json
--- a/de.json
+++ b/de.json
@@ -1,3 +1,3 @@
-  "starting_point": "Alt",
+  "starting_point": "Neu",`;

      const result = parseTranslationChangesFromDiff(diff, englishTranslations);
      expect(result).toHaveLength(1);
      expect(result[0].value).toBe('Neu');
    });

    it('should handle quoted paths with special characters', () => {
      const diff = `diff --git "a/zh-CN.json" "b/zh-CN.json"
--- "a/zh-CN.json"
+++ "b/zh-CN.json"
@@ -1,3 +1,3 @@
+  "starting_point": "起点",`;

      const result = parseTranslationChangesFromDiff(diff, englishTranslations);
      expect(result).toHaveLength(1);
      expect(result[0].file).toBe('zh-CN.json');
    });
  });
});

describe('utils tests', () => {
  describe('convertToRegexPattern', () => {
    it('should escape special regex characters', () => {
      const input = 'foo.bar*baz?';
      const pattern = convertToRegexPattern(input);
      expect(pattern).toBe('foo\\.bar\\*baz\\?');
    });

    it('should escape parentheses and brackets', () => {
      const input = 'func(a, b) => [c]';
      const pattern = convertToRegexPattern(input);
      // Note: = is also escaped as it's a special regex character
      expect(pattern).toBe('func\\(a,\\s+b\\)\\s+\\=>\\s+\\[c\\]');
    });

    it('should escape hyphens', () => {
      const input = 'foo-bar';
      const pattern = convertToRegexPattern(input);
      expect(pattern).toBe('foo\\-bar');
    });

    it('should convert whitespace sequences to flexible matcher', () => {
      const input = 'const   x  =  1';
      const pattern = convertToRegexPattern(input);
      // Note: = is also escaped as it's a special regex character
      expect(pattern).toBe('const\\s+x\\s+\\=\\s+1');
    });

    it('should handle newlines in input', () => {
      const input = 'line1\n  line2';
      const pattern = convertToRegexPattern(input);
      expect(pattern).toBe('line1\\s+line2');
    });
  });

  describe('getLineNumber', () => {
    const sampleCode = `import React from 'react';

const Component = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return <div>{count}</div>;
};

export default Component;`;

    it('should find a single line and return its line number', () => {
      const result = getLineNumber(sampleCode, 'const [count, setCount] = useState(0);');
      expect(result).toBe(4);
    });

    it('should find code on the first line', () => {
      const result = getLineNumber(sampleCode, "import React from 'react';");
      expect(result).toBe(1);
    });

    it('should find code on the last line', () => {
      const result = getLineNumber(sampleCode, 'export default Component;');
      expect(result).toBe(13);
    });

    it('should find multi-line code and return the last line number', () => {
      const searchString = `const handleClick = () => {
    setCount(count + 1);
  };`;
      const result = getLineNumber(sampleCode, searchString);
      expect(result).toBe(8);
    });

    it('should find multiline code at the start of file', () => {
      const searchString = `import React from 'react';

const Component = () => {`;
      const result = getLineNumber(sampleCode, searchString);
      expect(result).toBe(3);
    });

    it('should find multiline code at the end of file', () => {
      const searchString = `return <div>{count}</div>;
};

export default Component;`;
      const result = getLineNumber(sampleCode, searchString);
      expect(result).toBe(13);
    });

    it('should find multiline code spanning many lines', () => {
      const searchString = `const Component = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return <div>{count}</div>;
};`;
      const result = getLineNumber(sampleCode, searchString);
      expect(result).toBe(11);
    });

    it('should handle multiline with whitespace variations', () => {
      // Search with slightly different whitespace
      const searchString = `const handleClick  =  ()  =>  {
    setCount(count  +  1);
  };`;
      const result = getLineNumber(sampleCode, searchString);
      expect(result).toBe(8);
    });

    it('should find 2-line multiline code', () => {
      const code = `line one
line two
line three`;
      const searchString = `line one
line two`;
      const result = getLineNumber(code, searchString);
      expect(result).toBe(2);
    });

    it('should handle whitespace variations', () => {
      // Search with different whitespace than the actual code
      const result = getLineNumber(sampleCode, 'const  [count,  setCount]  =  useState(0);');
      expect(result).toBe(4);
    });

    it('should return -1 for non-existent code', () => {
      const result = getLineNumber(sampleCode, 'this does not exist');
      expect(result).toBe(-1);
    });

    it('should return -1 for empty search string', () => {
      const result = getLineNumber(sampleCode, '');
      expect(result).toBe(-1);
    });

    it('should return -1 for null/undefined inputs', () => {
      expect(getLineNumber(null, 'test')).toBe(-1);
      expect(getLineNumber(sampleCode, null)).toBe(-1);
      expect(getLineNumber(undefined, 'test')).toBe(-1);
    });

    it('should handle code with special regex characters', () => {
      const codeWithRegex = `const regex = /foo.*bar/;
const arr = [1, 2, 3];
const obj = { key: "value" };`;

      expect(getLineNumber(codeWithRegex, 'const regex = /foo.*bar/;')).toBe(1);
      expect(getLineNumber(codeWithRegex, 'const arr = [1, 2, 3];')).toBe(2);
      expect(getLineNumber(codeWithRegex, 'const obj = { key: "value" };')).toBe(3);
    });

    it('should find the first occurrence when duplicates exist', () => {
      const codeWithDuplicates = `console.log('first');
console.log('middle');
console.log('first');`;

      // Should find the first occurrence at line 1
      const result = getLineNumber(codeWithDuplicates, "console.log('first');");
      expect(result).toBe(1);
    });

    it('should handle indented code correctly', () => {
      const indentedCode = `function test() {
    if (true) {
        const x = 1;
    }
}`;
      const result = getLineNumber(indentedCode, '        const x = 1;');
      expect(result).toBe(3);
    });
  });

  describe('filterDiffByIgnoredFiles', () => {
    it('should return unchanged diff when no ignored files', () => {
      const diff = `diff --git a/src/App.tsx b/src/App.tsx
index 123..456 789
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,3 +1,4 @@
+import { useState } from 'react';
 import React from 'react';`;

      const result = filterDiffByIgnoredFiles(diff);
      expect(result).toBe(diff);
    });

    it('should filter out yarn.lock changes', () => {
      const diff = `diff --git a/src/App.tsx b/src/App.tsx
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,3 +1,4 @@
+import { useState } from 'react';
diff --git a/yarn.lock b/yarn.lock
--- a/yarn.lock
+++ b/yarn.lock
@@ -1,3 +1,4 @@
+some-package@1.0.0:`;

      const result = filterDiffByIgnoredFiles(diff);
      expect(result).toContain('src/App.tsx');
      expect(result).not.toContain('yarn.lock');
    });

    it('should filter out package-lock.json changes', () => {
      const diff = `diff --git a/package-lock.json b/package-lock.json
--- a/package-lock.json
+++ b/package-lock.json
@@ -1,3 +1,4 @@
+changes
diff --git a/src/utils.ts b/src/utils.ts
--- a/src/utils.ts
+++ b/src/utils.ts
@@ -1,3 +1,4 @@
+export const helper = () => {};`;

      const result = filterDiffByIgnoredFiles(diff);
      expect(result).not.toContain('package-lock.json');
      expect(result).toContain('src/utils.ts');
    });

    it('should filter out png files', () => {
      const diff = `diff --git a/src/App.tsx b/src/App.tsx
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1 +1 @@
-old
+new
diff --git a/assets/icon.png b/assets/icon.png
Binary files differ`;

      const result = filterDiffByIgnoredFiles(diff);
      expect(result).toContain('src/App.tsx');
      expect(result).not.toContain('icon.png');
    });

    it('should filter out Podfile.lock', () => {
      const diff = `diff --git a/ios/Podfile.lock b/ios/Podfile.lock
--- a/ios/Podfile.lock
+++ b/ios/Podfile.lock
@@ -1 +1 @@
-old
+new`;

      const result = filterDiffByIgnoredFiles(diff);
      expect(result).not.toContain('Podfile.lock');
    });

    it('should handle empty diff', () => {
      expect(filterDiffByIgnoredFiles('')).toBe('');
      expect(filterDiffByIgnoredFiles(null)).toBe(null);
      expect(filterDiffByIgnoredFiles(undefined)).toBe(undefined);
    });

    it('should return unchanged text when no diff headers are present', () => {
      const plainText = 'This is just some plain text\nwith no diff headers';
      const result = filterDiffByIgnoredFiles(plainText);
      expect(result).toBe(plainText);
    });

    it('should handle quoted paths in diff headers', () => {
      const diff = `diff --git "a/path with spaces/file.ts" "b/path with spaces/file.ts"
--- "a/path with spaces/file.ts"
+++ "b/path with spaces/file.ts"
@@ -1 +1 @@
-old
+new`;

      const result = filterDiffByIgnoredFiles(diff);
      expect(result).toContain('path with spaces/file.ts');
    });

    it('should filter out nitrogen generated files', () => {
      const diff = `diff --git a/packages/nitrogen/generated/File.ts b/packages/nitrogen/generated/File.ts
--- a/packages/nitrogen/generated/File.ts
+++ b/packages/nitrogen/generated/File.ts
@@ -1 +1 @@
-old
+new
diff --git a/src/real-code.ts b/src/real-code.ts
--- a/src/real-code.ts
+++ b/src/real-code.ts
@@ -1 +1 @@
-old
+new`;

      const result = filterDiffByIgnoredFiles(diff);
      expect(result).not.toContain('nitrogen/generated');
      expect(result).toContain('real-code.ts');
    });

    it('should preserve content before the first diff header', () => {
      const diff = `Some preamble text
Another line of metadata
diff --git a/src/App.tsx b/src/App.tsx
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1 +1 @@
-old
+new`;

      const result = filterDiffByIgnoredFiles(diff);
      expect(result).toContain('Some preamble text');
      expect(result).toContain('Another line of metadata');
      expect(result).toContain('src/App.tsx');
    });
  });
});
