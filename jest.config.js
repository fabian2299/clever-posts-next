const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testRegex: "/__tests__/.*/.*\\.test\\.[jt]sx?$",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
