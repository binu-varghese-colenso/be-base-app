module.exports = {
    // Indicates whether each individual test should be reported during the run
    verbose: true,
  
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    passWithNoTests: true,
  
    // The environment that will be used for testing
    testEnvironment: "node",
  
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ["src/**/*.ts"],
  
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
  
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ["text", "lcov"],
  
    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ["/node_modules/"],
  
    // The test runner to use
    testRunner: "jest-circus/runner",
  
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
  
    // Indicates whether each individual test should be reported during the run
    verbose: true,
  
    // The glob patterns Jest uses to detect test files
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ["/node_modules/"],
  
    // Allows you to use a custom runner instead of Jest's default test runner
    // runner: "your-custom-runner",
  
    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    // moduleNameMapper: {},
  
    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    // transformIgnorePatterns: [],
  
    // Indicates whether each individual test should be reported during the run
    // silent: false,
  
    // Add extra settings here as needed
  };
  