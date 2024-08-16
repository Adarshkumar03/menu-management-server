import request from "supertest";
import app from "../index.js";

describe("GET /subCategory", () => {
  it("should return all categories", async () => {
    const response = await request(app).get("/subCategory").expect(200);
    expect(response.body).toBeInstanceOf(Array); // Check if response is an array
  });
});

describe("GET /subCategory/:subCategoryId", () => {
  it("should return subCategory by id", async () => {
    const response = await request(app).get("/subCategory/2").expect(200);
    expect(response.body).toHaveProperty("id", 2);
  });
});

describe("POST /subCategory", () => {
  it("should create a new subCategory", async () => {
    const newsubCategory = {
      name: "Pancakes",
      image: "pancakes.png",
      description: "Fluffy pancakes served with syrup.",
      taxApplicable: true,
      tax: 5,
      categoryId: 7,
    };

    const response = await request(app)
      .post("/subCategory")
      .send(newsubCategory)
      .expect(201);
    expect(response.body).toHaveProperty("success", true);
  });
});

describe("POST /subCategory/:subCategoryId", () => {
  it("should update existing subCategory", async () => {
    const updateData = {
      name: "Salads",
      image: "salads_updated.png",
      description: "Fresh and nutritious salads for every taste.",
      taxApplicable: true,
      tax: 6,
      categoryId: 1,
    };

    const response = await request(app)
      .post("/subCategory/1")
      .send(updateData)
      .expect(201);
    expect(response.body).toHaveProperty("success", true);
  });
});
