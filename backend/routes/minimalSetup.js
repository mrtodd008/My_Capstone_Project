// backend/tests/minimalSetup.js
console.log("minimalSetup.js is running");
const { beforeAll, afterAll } = require("@jest/globals");

beforeAll(() => {
  console.log("beforeAll is running");
});
afterAll(() => {
  console.log("afterAll is running");
});
