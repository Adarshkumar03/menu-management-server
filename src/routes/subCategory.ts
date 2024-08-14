import { Router } from "express";
import * as categoryControllers from "../controllers/subCategoryControllers";
const router = Router();

router.get("/", categoryControllers.getSubCategories);
router.get("/:subCategoryId", categoryControllers.getSubCategory);
router.post("/", categoryControllers.createSubCategory);
router.post("/:subCategoryId", categoryControllers.updateSubCategory);

export default router;
