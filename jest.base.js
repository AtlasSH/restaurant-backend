module.exports = {
  collectCoverage: false,

  reporters: [
    'default',
    [
      '@casualbot/jest-sonar-reporter',
      {
        relativePaths: true,
        outputName: 'sonar-report.xml',
        outputDirectory: 'coverage',
      },
    ],
  ],

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },

  testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
};
