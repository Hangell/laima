module.exports = {
  rootDir: '..',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'config/tsconfig.test.json' }],
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/cli.ts', '!src/types.ts'],
  coverageThreshold: {
    global: { branches: 90, functions: 90, lines: 90, statements: 90 },
  },
};
