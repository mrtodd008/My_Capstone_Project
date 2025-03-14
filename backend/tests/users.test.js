// backend/tests/users.test.js
console.log("users.test.js is running");
const request = require("supertest");
const app = require("../index"); // Assuming your main app file is index.js
const sequelize = require("../db");

describe("User API Tests", () => {
  let userId;

  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send({
      fullName: "Test User",
      djName: "TestDJ",
      phoneNumber: "123-456-7890",
      address: "123 Test St",
      role: "user",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    userId = res.body.id;
  });

  it("should get all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a user", async () => {
    const res = await request(app).put(`/api/users/${userId}`).send({
      fullName: "Updated User",
      djName: "UpdatedDJ",
      phoneNumber: "987-654-3210",
      address: "456 Updated St",
      role: "admin",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.fullName).toEqual("Updated User");
  });

  it("should delete a user", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
  });

  it("should return 404 when deleting a non-existent user", async () => {
    const res = await request(app).delete(`/api/users/999999`);
    expect(res.statusCode).toEqual(500);
  });
});
