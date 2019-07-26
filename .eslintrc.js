module.exports = {
  extends: [
    'airbnb',
  ],
  parser: "babel-eslint",
  plugins: [
    'jest',
    'emotion',
  ],
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    }
  },
  globals: {
    __DEV__: true,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-no-bind': 'off',
     'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    'import/no-named-as-default': 'off',
    'react/no-array-index-key': 'off',
    'no-constant-condition': 'off',
    'jsx-a11y/anchor-is-valid': ['error', {
      'components': ['Link'],
      'specialLink': ["to", 'hrefLeft', 'hrefRight'],
      'aspects': ['noHref', 'invalidHref', 'preferButton']
    }],
    'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/import-from-emotion': 'error',
    'emotion/styled-import': 'error'
  },
};
