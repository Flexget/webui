module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/{app,Root}.tsx',
    '!src/utils/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!src/**/fixtures.{ts,tsx}',
    '!src/plugins/*/index.ts',
    '!src/plugins/lists/{entry,movies,pending}/index.ts',
    '!src/core/operations/index.ts',
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
    __VERSION__: '2.0.28',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json', diagnostics: { warnOnly: true } }],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.ts',
    'monaco-editor': '<rootDir>/node_modules/react-monaco-editor',
    '^worker-loader!': '<rootDir>/src/__mocks__/worker.ts',
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFiles: ['<rootDir>/src/utils/tests/setupFiles.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-extended/all'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: { url: 'http://localhost/' },
};
