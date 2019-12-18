module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/store.js',
    '!src/core/reducers.ts',
    '!src/core/history.ts',
    '!src/plugins/series/**',
    '!src/{app,Root,theme}.{ts,tsx,js,jsx}',
    '!src/utils/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!src/store/**/shapes.js',
    '!src/**/fixtures.{ts, tsx, js, jsx}',
  ],
  coverageThreshold: {
    global: {
      functions: 60,
      lines: 80,
      statements: 80,
      branches: 60,
    },
  },
  globals: {
    __DEV__: false,
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
      babelConfig: true,
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  preset: 'ts-jest/presets/js-with-ts',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer', 'jest-emotion'],
  setupFiles: ['raf/polyfill', '<rootDir>/src/utils/tests/setupFiles.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'jest-extended', 'jest-chain'],
  testURL: 'http://localhost/',
};
