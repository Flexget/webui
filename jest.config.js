module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/{app,Root}.tsx',
    '!src/utils/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!src/**/fixtures.{ts,tsx}',
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
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.ts',
    'monaco-editor': '<rootDir>/node_modules/react-monaco-editor'
  },
  snapshotSerializers: ['enzyme-to-json/serializer', 'jest-emotion'],
  setupFiles: ['raf/polyfill', '<rootDir>/src/utils/tests/setupFiles.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'jest-extended', 'jest-chain'],
  testURL: 'http://localhost/',
};
