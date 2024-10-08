module.exports = {
  preset: 'react-native',
  // setup additional testing libraries here
  setupFiles: ['./jestSetupFile.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
};
