module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/store.js',
    '!src/core/reducers.ts',
    '!src/core/sagas.ts',
    '!src/core/history/**',
    '!src/core/routes/**',
    '!src/core/registry/**',
    '!src/plugins/series/data/*.ts',
    '!src/{app,root,theme}.{ts,tsx,js,jsx}',
    '!src/utils/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!src/store/**/shapes.js',
  ],
  coverageThreshold: {
    // global: {
    // functions: 40,
    // lines: 40,
    // statements: 40,
    // },
  },
  globals: {
    __DEV__: false,
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
      babelConfig: require('./babel.config.js'),
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '^.+\\.jsx?$': './babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  setupFiles: ['raf/polyfill', '<rootDir>/src/utils/tests/setupFiles.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/utils/tests/setupTest.js'],
  testURL: 'http://localhost/',
};
