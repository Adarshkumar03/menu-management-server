import { Router } from "express";
import * as categoryControllers from "../controllers/categoryControllers.js";
const router = Router();

router.get("/", categoryControllers.getCategories);
router.get("/:categoryId", categoryControllers.getCategory);
router.get("/:categoryId/subCategories", categoryControllers.getSubCategories);
router.get("/:categoryId/items", categoryControllers.getItems);
router.post("/", categoryControllers.createCategory);
router.post("/:categoryId", categoryControllers.updateCategory);

export default router;
