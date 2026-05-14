import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("Gym API integration tests", () => {
  it("GET /gyms returns 200 and an array", async () => {
    const response = await request(app).get("/gyms");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /gyms/:id returns 404 for an unknown ID", async () => {
    const response = await request(app).get("/gyms/999");

    expect(response.status).toBe(404);
  });

  it("POST /gyms without login returns 401", async () => {
    const response = await request(app).post("/gyms").send({
      name: "Test Gym",
      location: "Stockholm",
    });

    expect(response.status).toBe(401);
  });

  it("GET /profile without login returns 401", async () => {
    const response = await request(app).get("/profile");

    expect(response.status).toBe(401);
  });

  it("POST /gyms/:id/reviews without login returns 401", async () => {
    const response = await request(app).post("/gyms/1/reviews").send({
      user: "Dimuthu",
      rating: 5,
      comment: "Good gym",
    });

    expect(response.status).toBe(401);
  });
});
