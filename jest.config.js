module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/store.js',
    '!src/core/reducers.js',
    '!src/core/sagas.js',
    '!src/core/history/**',
    '!src/core/routes/**',
    '!src/core/registry/**',
    '!src/plugins/series/data/*.js',
    '!src/{app,root,theme}.{js,jsx}',
    '!src/utils/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!src/store/**/shapes.js',
  ],
  coverageThreshold: {
    global: {
      functions: 40,
      lines: 40,
      statements: 40,
    },
  },
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  setupFiles: [
    'raf/polyfill',
    '<rootDir>/src/utils/tests/setupFiles.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/utils/tests/setupTest.js'],
  testURL: 'http://localhost/',
};
