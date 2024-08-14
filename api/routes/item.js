import { Router } from "express";
import * as itemControllers from "../controllers/itemControllers.js";
const router = Router();

router.get("/", itemControllers.getItems);
router.get("/:itemId", itemControllers.getItem);
router.post("/", itemControllers.createItem);
router.post("/:itemId", itemControllers.updateItem);

export default router;
