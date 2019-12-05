module.exports = {
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
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
    __DEV__: true,
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  rules: {
    // typescript
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],

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

    // React
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-no-bind': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
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

  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
