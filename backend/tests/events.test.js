// backend/tests/events.test.js
console.log("events.test.js is running");
const request = require("supertest");
const app = require("../index");
const sequelize = require("../db");

describe("Event API Tests", () => {
  let eventId;

  it("should create a new event", async () => {
    const res = await request(app).post("/api/events").send({
      eventName: "Test Event",
      date: "2023-12-31",
      location: "Test Location",
      description: "Test Description",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    eventId = res.body.id;
  });

  it("should get all events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update an event", async () => {
    const res = await request(app).put(`/api/events/${eventId}`).send({
      eventName: "Updated Event",
      date: "2024-01-01",
      location: "Updated Location",
      description: "Updated Description",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.eventName).toEqual("Updated Event");
  });

  it("should delete an event", async () => {
    const res = await request(app).delete(`/api/events/${eventId}`);
    expect(res.statusCode).toEqual(200);
  });
});
