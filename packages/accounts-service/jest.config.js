module.exports = {
  preset: '../../jest.base.js',

  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/core/**/*.ts',
    'src/modules/**/domain/**/*.ts',
    'src/modules/**/factories/**/*.ts',
    'src/modules/**/useCases/**/*.ts',
    '!src/modules/**/useCases/**/errors/*.ts',
    'src/modules/**/mappers/*.ts',
    'src/utils/**/*.ts',
  ],
};
