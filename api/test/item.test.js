import request from "supertest";
import app from "../index.js";

describe("GET /item", () => {
  it("should return all categories", async () => {
    const response = await request(app).get("/item").expect(200);
    expect(response.body).toBeInstanceOf(Array); // Check if response is an array
  });
});

describe("GET /item/:itemId", () => {
  it("should return item by id", async () => {
    const response = await request(app).get("/item/2").expect(200);
    expect(response.body).toHaveProperty("id", 2);
  });
});

describe("POST /item", () => {
  it("should create a new item", async () => {
    const newitem = {
      name: "Blueberry Pancakes",
      image: "blueberry_pancakes.png",
      description: "Pancakes topped with fresh blueberries.",
      taxApplicable: true,
      tax: 5,
      baseAmount: 7,
      discount: 1,
      totalAmount: 6,
      subCategoryId: 5,
    };

    const response = await request(app).post("/item").send(newitem).expect(201);
    expect(response.body).toHaveProperty("success", true);
  });
});

describe("POST /item/:itemId", () => {
  it("should update existing item", async () => {
    const updateData = {
      name: "Caesar Salad",
      image: "caesar_salad_updated.png",
      description:
        "Classic Caesar salad with fresh croutons and parmesan cheese.",
      taxApplicable: true,
      tax: 5,
      baseAmount: 13,
      discount: 1,
      totalAmount: 12,
      subCategoryId: 1,
    };

    const response = await request(app)
      .post("/item/1")
      .send(updateData)
      .expect(201);
    expect(response.body).toHaveProperty("success", true);
  });
});
