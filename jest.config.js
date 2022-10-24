module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/core/**/*.ts',
    'src/infra/**/*.ts',
    'src/modules/**/*.ts',
  ],
  coveragePathIgnorePatterns: ['infra/db'],

  testMatch: ['**/*.spec.ts'],
};
