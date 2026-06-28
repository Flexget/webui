const tseslint = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const importPlugin = require('eslint-plugin-import');
const jest = require('eslint-plugin-jest');
const jestDom = require('eslint-plugin-jest-dom');
const testingLibrary = require('eslint-plugin-testing-library');
const a11y = require('eslint-plugin-jsx-a11y');
const emotion = require('@emotion/eslint-plugin');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = tseslint.config(
  { ignores: ['dist/', 'node_modules/', '**/*.d.ts'] },

  // TypeScript base rules
  ...tseslint.configs.recommended,

  // React (classic transform: react/jsx-uses-react marks React as used)
  react.configs.flat.recommended,

  // Prettier disables formatting rules that conflict with prettier
  prettier,

  {
    plugins: {
      import: importPlugin,
      'jsx-a11y': a11y,
      '@emotion': emotion,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        __DEV__: 'readonly',
        __VERSION__: 'readonly',
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: { project: './tsconfig.json' } },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true, argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/unified-signatures': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'warn',

      // Emotion
      '@emotion/import-from-emotion': 'error',
      '@emotion/no-vanilla': 'error',
      '@emotion/styled-import': 'error',

      // Import
      'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never', js: 'never', jsx: 'never' }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/no-named-as-default': 'off',
      'import/prefer-default-export': 'off',
      'import/no-cycle': 'off',

      // Core
      'no-constant-condition': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'off',

      // React
      'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
      'react/display-name': 'off',
      'react/forbid-prop-types': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
      'react/jsx-no-bind': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-array-index-key': 'off',
      'react/prop-types': 'off',
      'react/state-in-constructor': ['error', 'never'],
      'react/static-property-placement': 'off',

      // React Hooks
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // A11y
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to', 'hrefLeft', 'hrefRight'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],
    },
  },

  // Test files
  {
    files: ['**/*.spec.{ts,tsx}', '**/__mocks__/**/*.{ts,tsx}'],
    plugins: { jest, 'jest-dom': jestDom, 'testing-library': testingLibrary },
    languageOptions: {
      globals: { ...globals.jest },
    },
    rules: {
      ...jest.configs['flat/recommended'].rules,
      ...jestDom.configs['flat/recommended'].rules,
      ...testingLibrary.configs['flat/react'].rules,
      'jest/no-conditional-expect': 'warn',
      'jest/no-test-prefixes': 'warn',
      'jest/valid-title': 'warn',
      'testing-library/no-container': 'warn',
      'testing-library/no-manual-cleanup': 'warn',
      'testing-library/no-node-access': 'warn',
      'testing-library/prefer-presence-queries': 'warn',
      'testing-library/prefer-screen-queries': 'warn',
    },
  },
);
