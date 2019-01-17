module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '**/tests/**/*.ts'
  ],
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1'
  },
  globals: {
    TextDecoder: TextDecoder
  }
};
