/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // The glob patterns Jest uses to detect test files
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
      "\\\\node_modules\\\\",
      "\\\\dist\\\\"
    ],
    // A map from regular expressions to paths to transformers
    transform: {
      // "^.+\\.[t|j]s?$": "babel-jest"
      "^.+\\.ts?$": "ts-jest"
    }
  };
