// backend/jest.config.js
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.test.js"],
  setupFiles: ["./tests/minimal.test.js"], // Optional setup file
};
