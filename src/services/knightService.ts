import Knight from "../models/knight";

export class KnightService {
  async getAll() {
    return await Knight.find();
  }

  async getById(id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("ID inválido (debe ser un ObjectId de MongoDB)");
    }

    return await Knight.findById(id);
  }

  async searchByName(name: string) {
    if (!name) throw new Error("Debe proporcionar un nombre");
    return await Knight.find({
      name: { $regex: new RegExp(name, "i") }, // búsqueda insensible a mayúsculas
    });
  }
  async search(filters: { name?: string; armor?: string; rank?: string }) {
    const query: any = {};

    if (filters.name)
      query.name = { $regex: new RegExp(filters.name, "i") };
    if (filters.armor)
      query.armor = { $regex: new RegExp(filters.armor, "i") };
    if (filters.rank)
      query.rank = filters.rank;

    return await Knight.find(query);
  }
}
