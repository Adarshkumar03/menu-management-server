import { Router } from "express";
import * as categoryControllers from "../controllers/categoryControllers.js";

// Create a router instance for handling category routes
const router = Router();

// Route to get all categories
router.get("/", categoryControllers.getCategories);

// Route to get a specific category by ID
router.get("/:categoryId", categoryControllers.getCategory);

// Route to get subcategories for a specific category
router.get("/:categoryId/subCategories", categoryControllers.getSubCategories);

// Route to get items for a specific category
router.get("/:categoryId/items", categoryControllers.getItems);

// Route to create a new category
router.post("/", categoryControllers.createCategory);

// Route to update a category by ID
router.post("/:categoryId", categoryControllers.updateCategory);

// Export the router to be used in the main app
export default router;