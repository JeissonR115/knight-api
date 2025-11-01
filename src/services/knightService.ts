import Knight from "../models/knight";
import { KnightResponse, KnightFilters } from "../types/knight";

export class KnightService {
  async getAll(): Promise<KnightResponse[]> {
    try {
      const knights = await Knight.find();
      return knights.map(knight => this.toKnightResponse(knight));
    } catch (error) {
      throw new Error("Error retrieving knights");
    }
  }


  async searchByName(name: string): Promise<KnightResponse[]> {
    try {
      if (!name || name.trim().length === 0) {
        throw new Error("Debe proporcionar un nombre");
      }
      const knights = await Knight.find({
        name: { $regex: new RegExp(name, "i") },
      });
      return knights.map(knight => this.toKnightResponse(knight));
    } catch (error) {
      throw error;
    }
  }

  async search(filters: KnightFilters): Promise<KnightResponse[]> {
    try {
      const query: any = {};

      if (filters.name && filters.name.trim().length > 0)
        query.name = { $regex: new RegExp(filters.name, "i") };
      if (filters.armor && filters.armor.trim().length > 0)
        query.armor = { $regex: new RegExp(filters.armor, "i") };
      if (filters.rank && filters.rank.trim().length > 0)
        query.rank = filters.rank;

      const knights = await Knight.find(query);
      return knights.map(knight => this.toKnightResponse(knight));
    } catch (error) {
      throw new Error("Error during search");
    }
  }

  private toKnightResponse(knight: any): KnightResponse {
    return {
      name: knight.name,
      armor: knight.armor,
      rank: knight.rank,
      power: knight.power,
      img: knight.img,
      createdAt: knight.createdAt,
      updatedAt: knight.updatedAt
    };
  }
}