import request from "supertest";
import app from "../index.js";

describe("GET /", () => {
  it("should return a welcome message", (done) => {
    request(app)
      .get("/")
      .expect(200) // Check for status code
      .expect((res) => {
        expect(res.body).toEqual({
          message:
            "Welcome to the Menu Management API. Manage categories, subcategories, and items efficiently.",
        });
      })
      .end((err, res) => {
        if (err) return done(err); // Handle errors and complete the test
        done(); // Signal test completion
      });
  });
});
