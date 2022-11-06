module.exports = {
  preset: '../../jest.base.js',

  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['infra/db'],
  collectCoverageFrom: [
    'src/core/**/*.ts',
    'src/infra/**/*.ts',
    'src/modules/**/*.ts',
    'src/utils/**/*.ts',
  ],
};
