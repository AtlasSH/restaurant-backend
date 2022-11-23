module.exports = {
  collectCoverage: false,

  testResultsProcessor: 'jest-sonar-reporter',

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },

  testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
};
