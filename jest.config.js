module.exports = {
  bail: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`src/**/*.js`],
  coveragePathIgnorePatterns: [`src/index.js`],
  coverageReporters: [`html`, `lcov`],
  setupTestFrameworkScriptFile: `<rootDir>/src/__tests__/testHelpers/matchers/customMatchers.js`,
  setupFiles: [],
  modulePaths: [`<rootDir>/src/__tests__/api/helpers.js`],
  modulePathIgnorePatterns: [`testHelpers/`],
}
