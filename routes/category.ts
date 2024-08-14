import { Router } from "express";
import * as categoryControllers from "../controllers/categoryControllers";
const router = Router();

router.get("/", categoryControllers.getCategories);
router.get("/:categoryId", categoryControllers.getCategory);
router.post("/", categoryControllers.createCategory);
router.post("/:categoryId", categoryControllers.updateCategory);

export default router;
