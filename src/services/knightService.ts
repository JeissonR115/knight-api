import Knight from "../models/knight";
import { KnightResponse, KnightFilters } from "../types/knight";

export class KnightService {
  async getAll(): Promise<KnightResponse[]> {
    const knights = await Knight.find();
    return knights.map(knight => this.toKnightResponse(knight));
  }

  async searchByName(name: string): Promise<KnightResponse[]> {
    if (!name) throw new Error("Debe proporcionar un nombre");
    const knights = await Knight.find({
      name: { $regex: new RegExp(name, "i") },
    });
    return knights.map(knight => this.toKnightResponse(knight));
  }

  async search(filters: KnightFilters): Promise<KnightResponse[]> {
    const query: any = {};

    if (filters.name)
      query.name = { $regex: new RegExp(filters.name, "i") };
    if (filters.armor)
      query.armor = { $regex: new RegExp(filters.armor, "i") };
    if (filters.rank)
      query.rank = filters.rank;

    const knights = await Knight.find(query);
    return knights.map(knight => this.toKnightResponse(knight));
  }

  private toKnightResponse(knight: any): KnightResponse {
    return {
      name: knight.name,
      armor: knight.armor,
      rank: knight.rank,
      power: knight.power,
      img: knight.img
    };
  }
}