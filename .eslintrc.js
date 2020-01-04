module.exports = {
  extends: [
    'airbnb',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['jest', 'emotion', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  globals: {
    fetchMock: true,
    __DEV__: true,
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    project: './tsconfig.json',
  },
  rules: {
    // typescript
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/unified-signatures': 'warn',

    // emotion
    'emotion/import-from-emotion': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/styled-import': 'error',

    // import
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',

    // core
    'no-constant-condition': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',

    // React
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-no-bind': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
        'react/prop-types': 'off',
    'react/state-in-constructor': ['error', 'never'],
    'react/static-property-placement': 'off',

    // hooks
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',

    // a11y
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
  },
};
