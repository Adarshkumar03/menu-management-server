import { Router } from "express";
import * as categoryControllers from "../controllers/categoryControllers";
const router = Router();

router.get("/", categoryControllers.getCategories);
router.get("/:subCategoryId", categoryControllers.getCategory);
router.post("/", categoryControllers.createCategory);
router.post("/:subCategoryId", categoryControllers.updateCategory);

export default router;
