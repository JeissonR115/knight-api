import { Request, Response } from "express";
import { PokemonService } from "../services/PokemonService";

const pokemonService = new PokemonService();

export class PokemonController {
  static async getAll(req: Request, res: Response) {
    try {
      const pokemons = await pokemonService.getAll();
      res.json(pokemons);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      // ✅ Validar que el ID sea un número válido
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          error: "ID inválido. Debe ser un número positivo.",
        });
      }

      const pokemon = await pokemonService.getById(id);

      if (!pokemon) {
        return res.status(404).json({ error: "Pokémon no encontrado" });
      }

      res.json(pokemon);
    } catch (error) {
      console.error("Error fetching pokemon by ID:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async searchByName(req: Request, res: Response) {
    try {
      const name = req.query.name?.toString();

      if (!name || name.trim() === "") {
        return res.status(400).json({
          error: "Se requiere el parámetro 'name'",
        });
      }

      const results = await pokemonService.searchByName(name.trim());

      if (!results || results.length === 0) {
        return res.status(404).json({
          message: "No se encontraron Pokémon con ese nombre",
        });
      }

      res.json(results);
    } catch (error) {
      console.error("Error en búsqueda de Pokémon por nombre:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  static async search(req: Request, res: Response) {
    const filters = {
      name: req.query.name?.toString(),
      type: req.query.type?.toString(),
      ability: req.query.ability?.toString(),
      minHeight: req.query.minHeight ? Number(req.query.minHeight) : undefined,
      maxHeight: req.query.maxHeight ? Number(req.query.maxHeight) : undefined,
      minWeight: req.query.minWeight ? Number(req.query.minWeight) : undefined,
      maxWeight: req.query.maxWeight ? Number(req.query.maxWeight) : undefined,
    };

    const results = await pokemonService.search(filters);
    if (results.length === 0)
      return res.status(404).json({ message: "No se encontraron pokemons" });
    res.json(results);
  }
}
