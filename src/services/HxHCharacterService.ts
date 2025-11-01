import HxHCharacter from "../models/HxHCharacter";
import { HxHCharacterResponse, HxHCharacterFilters, CreateHxHCharacterDTO, UpdateHxHCharacterDTO } from "../types/HxHCharacter";

export class HxHCharacterService {
  
  async create(characterData: CreateHxHCharacterDTO): Promise<HxHCharacterResponse> {
    const existingCharacter = await HxHCharacter.findOne({ name: characterData.name });
    if (existingCharacter) {
      throw new Error(`Ya existe un personaje con el nombre: ${characterData.name}`);
    }

    const newCharacter = new HxHCharacter(characterData);
    const savedCharacter = await newCharacter.save();
    return this.toCharacterResponse(savedCharacter);
  }

  async getById(id: string): Promise<HxHCharacterResponse> {
    const character = await HxHCharacter.findById(id);
    if (!character) {
      throw new Error(`Personaje con ID ${id} no encontrado`);
    }
    return this.toCharacterResponse(character);
  }
  // READ - Buscar personajes con filtros
  async search(filters: HxHCharacterFilters = {}): Promise<HxHCharacterResponse[]> {
    const query: any = {};

    if (filters.name)
      query.name = { $regex: new RegExp(filters.name, "i") };
    
    if (filters.age)
      query.age = filters.age;
    
    if (filters.minHeight || filters.maxHeight) {
      query.height = {};
      if (filters.minHeight) query.height.$gte = filters.minHeight;
      if (filters.maxHeight) query.height.$lte = filters.maxHeight;
    }
    
    if (filters.minWeight || filters.maxWeight) {
      query.weight = {};
      if (filters.minWeight) query.weight.$gte = filters.minWeight;
      if (filters.maxWeight) query.weight.$lte = filters.maxWeight;
    }

    const characters = await HxHCharacter.find(query);
    return characters.map(character => this.toCharacterResponse(character));
  }

  // UPDATE - Actualizar personaje completo
  async update(id: string, characterData: UpdateHxHCharacterDTO): Promise<HxHCharacterResponse> {
    // Verificar si el nombre ya existe en otro personaje
    if (characterData.name) {
      const existingCharacter = await HxHCharacter.findOne({ 
        name: characterData.name, 
        _id: { $ne: id } 
      });
      if (existingCharacter) {
        throw new Error(`Ya existe otro personaje con el nombre: ${characterData.name}`);
      }
    }

    const updatedCharacter = await HxHCharacter.findByIdAndUpdate(
      id, 
      characterData, 
      { new: true, runValidators: true }
    );

    if (!updatedCharacter) {
      throw new Error(`Personaje con ID ${id} no encontrado`);
    }

    return this.toCharacterResponse(updatedCharacter);
  }

  // UPDATE - Actualización parcial
  async partialUpdate(id: string, updates: Partial<UpdateHxHCharacterDTO>): Promise<HxHCharacterResponse> {
    return this.update(id, updates);
  }

  // DELETE - Eliminar personaje
  async delete(id: string): Promise<{ message: string }> {
    const deletedCharacter = await HxHCharacter.findByIdAndDelete(id);
    
    if (!deletedCharacter) {
      throw new Error(`Personaje con ID ${id} no encontrado`);
    }

    return { message: `Personaje "${deletedCharacter.name}" eliminado correctamente` };
  }

  // DELETE - Eliminar por nombre
  async deleteByName(name: string): Promise<{ message: string }> {
    const deletedCharacter = await HxHCharacter.findOneAndDelete({ name });
    
    if (!deletedCharacter) {
      throw new Error(`Personaje "${name}" no encontrado`);
    }

    return { message: `Personaje "${name}" eliminado correctamente` };
  }

  // Método utilitario para formatear respuesta
  private toCharacterResponse(character: any): HxHCharacterResponse {
    return {
      id: character._id.toString(),
      name: character.name,
      age: character.age,
      height: character.height,
      weight: character.weight,
      img: character.img
    };
  }
}