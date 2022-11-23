module.exports = {
  collectCoverage: false,

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },

  testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
};
