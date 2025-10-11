import { AppDataSource } from "../config/db";
import { Pokemon } from "../models/Pokemon";

export class PokemonService {
  private repo = AppDataSource.getRepository(Pokemon);

  // 🔹 Obtener todos los Pokémon
  async getAll(): Promise<Pokemon[]> {
    return await this.repo.find({
      relations: ["types", "abilities", "stats"],
      order: { id: "ASC" },
    });
  }

  // 🔹 Obtener por ID
  async getById(id: number): Promise<Pokemon | null> {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido");

    return await this.repo.findOne({
      where: { id },
      relations: ["types", "abilities", "stats"],
    });
  }

  // 🔹 Buscar por nombre (búsqueda simple)
  async searchByName(name: string): Promise<Pokemon[]> {
    return await this.repo
      .createQueryBuilder("pokemon")
      .leftJoinAndSelect("pokemon.types", "type")
      .leftJoinAndSelect("pokemon.abilities", "ability")
      .leftJoinAndSelect("pokemon.stats", "stat")
      .where("LOWER(pokemon.name) LIKE LOWER(:name)", { name: `%${name}%` })
      .orderBy("pokemon.name", "ASC")
      .getMany();
  }

  // 🔹 Búsqueda avanzada con múltiples filtros
  async search(filters: {
    name?: string;
    type?: string;
    ability?: string;
    minHeight?: number;
    maxHeight?: number;
    minWeight?: number;
    maxWeight?: number;
  }): Promise<Pokemon[]> {
    const query = this.repo
      .createQueryBuilder("pokemon")
      .leftJoinAndSelect("pokemon.types", "type")
      .leftJoinAndSelect("pokemon.abilities", "ability")
      .leftJoinAndSelect("pokemon.stats", "stat");

    if (filters.name)
      query.andWhere("LOWER(pokemon.name) LIKE LOWER(:name)", {
        name: `%${filters.name}%`,
      });
    if (filters.type)
      query.andWhere("LOWER(type.name) LIKE LOWER(:type)", {
        type: `%${filters.type}%`,
      });
    if (filters.ability)
      query.andWhere("LOWER(ability.name) LIKE LOWER(:ability)", {
        ability: `%${filters.ability}%`,
      });
    if (filters.minHeight)
      query.andWhere("pokemon.height >= :minHeight", {
        minHeight: filters.minHeight,
      });
    if (filters.maxHeight)
      query.andWhere("pokemon.height <= :maxHeight", {
        maxHeight: filters.maxHeight,
      });
    if (filters.minWeight)
      query.andWhere("pokemon.weight >= :minWeight", {
        minWeight: filters.minWeight,
      });
    if (filters.maxWeight)
      query.andWhere("pokemon.weight <= :maxWeight", {
        maxWeight: filters.maxWeight,
      });

    return await query.orderBy("pokemon.name", "ASC").getMany();
  }
}
