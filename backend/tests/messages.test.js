// backend/tests/messages.test.js
console.log("messages.test.js is running");
const request = require("supertest");
const app = require("../index");
const sequelize = require("../db");

describe("Message API Tests", () => {
  it("should create a new message", async () => {
    const res = await request(app).post("/api/messages").send({
      text: "Test Message",
      sender: "Test Sender",
    });
    expect(res.statusCode).toEqual(201);
  });

  it("should get all messages", async () => {
    const res = await request(app).get("/api/messages");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
