import { Router } from "express";
import { knightController } from "../controllers/knightController";

const router = Router();
router.get("/search/name", knightController.searchByName);
router.get("/search", knightController.search);

router.get("/", knightController.getAll);
router.get("/:id", knightController.getById);

export default router;
