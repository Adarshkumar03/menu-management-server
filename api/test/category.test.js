import request from "supertest";
import app from "../index.js";

describe("GET /category", () => {
  it("should return all categories", async () => {
    const response = await request(app).get("/category").expect(200);
    expect(response.body).toBeInstanceOf(Array); // Check if response is an array
  });
});

describe("GET /category/:categoryId", () => {
  it("should return category by id", async () => {
    const response = await request(app).get("/category/2").expect(200);
    expect(response.body).toHaveProperty("id", 2);
  });
});

describe("POST /category", () => {
  it("should create a new category", async () => {
    const newCategory = {
      name: "Breakfast",
      image: "breakfast.png",
      description: "Start your day with our delightful breakfast options.",
      taxApplicable: true,
      tax: 5,
      taxType: "Percentage",
    };
    const response = await request(app)
      .post("/category")
      .send(newCategory)
      .expect(201);
    expect(response.body).toHaveProperty("success", true);
  });
});

describe("POST /category/:catergoryId", () => {
  it("should update existing category", async () => {
    const updateData = {
      name: "Desserts",
      image: "desserts_updated.png",
      description: "Sweet treats to finish your meal on a high note.",
      taxApplicable: true,
      tax: 9,
      taxType: "Percentage",
    };

    const response = await request(app)
      .post("/category/3")
      .send(updateData)
      .expect(201);
    expect(response.body).toHaveProperty("success", true);
  });
});
