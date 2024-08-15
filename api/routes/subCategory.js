import { Router } from "express";
import * as subCategoryControllers from "../controllers/subCategoryControllers.js";
const router = Router();

router.get("/", subCategoryControllers.getSubCategories);
router.get("/:subCategoryId", subCategoryControllers.getSubCategory);
router.get("/:subCategoryId/items", subCategoryControllers.getItems);
router.post("/", subCategoryControllers.createSubCategory);
router.post("/:subCategoryId", subCategoryControllers.updateSubCategory);

export default router;
