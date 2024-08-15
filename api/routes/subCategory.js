import { Router } from "express";
import * as subCategoryControllers from "../controllers/subCategoryControllers.js";

// Create a router instance for handling subcategory routes
const router = Router();

// Route to get all subcategories
router.get("/", subCategoryControllers.getSubCategories);

// Route to get a specific subcategory by ID
router.get("/:subCategoryId", subCategoryControllers.getSubCategory);

// Route to get items for a specific subcategory
router.get("/:subCategoryId/items", subCategoryControllers.getItems);

// Route to create a new subcategory
router.post("/", subCategoryControllers.createSubCategory);

// Route to update a subcategory by ID
router.post("/:subCategoryId", subCategoryControllers.updateSubCategory);

// Export the router to be used in the main app
export default router;
