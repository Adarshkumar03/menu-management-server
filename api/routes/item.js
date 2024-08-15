import { Router } from "express";
import * as itemControllers from "../controllers/itemControllers.js";

// Create a router instance for handling item routes
const router = Router();

// Route to get all items
router.get("/", itemControllers.getItems);

// Route to get a specific item by ID
router.get("/:itemId", itemControllers.getItem);

// Route to search for items by name
router.get("/search/:name", itemControllers.getItemByName);

// Route to create a new item
router.post("/", itemControllers.createItem);

// Route to update an item by ID
router.post("/:itemId", itemControllers.updateItem);

// Export the router to be used in the main app
export default router;
