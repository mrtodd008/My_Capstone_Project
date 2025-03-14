// backend/tests/setup.js
console.log("setup.js is running");
const { beforeAll, afterAll } = require("@jest/globals");
const sequelize = require("../db"); // Import Sequelize instance
const User = require("../routes/users"); // Import your models
const Event = require("../routes/events");
const Message = require("../routes/messages");

beforeAll(async () => {
  // Option 1: Sync models (create tables if they don't exist)
  // Be careful with force: true in production!
  // await sequelize.sync({ force: true }); // Resets the database each test run.
  await sequelize.sync(); // Creates tables if they don't exist.

  // Option 2: Add test data here (if needed)
  // Example:
  // await User.create({ fullName: 'Test User', email: 'test@example.com' });
});

afterAll(async () => {
  // Close the Sequelize connection
  await sequelize.close();
});
