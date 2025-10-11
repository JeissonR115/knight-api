import { Router } from "express";
import { PokemonController } from "../controllers/PokemonController";

const router = Router();
router.get("/search/name", PokemonController.searchByName);
router.get("/search", PokemonController.search);

router.get("/", PokemonController.getAll);
router.get("/:id", PokemonController.getById);

export default router;
