// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,

  // TypeScript support
  ...tseslint.configs.recommended,

  // Ignore generated and build output
  {
    ignores: [
      '.astro/**',
      'dist/**',
      'node_modules/**'
    ],
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Avoid requiring per-file project lookup that breaks on Astro virtual files
        // We still get type-aware linting through TypeScript itself in CI.
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    rules: {
      // Example custom rules for TS
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Allow minimal use of any in narrow cases
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // JS files config (same as before)
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'eqeqeq': ['error', 'always'],
    },
  },
];
