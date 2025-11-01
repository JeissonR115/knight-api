import { AppDataSource } from "../config/db";
import HxHCharacter  from "../models/HxHCharacter";
import { 
  HxHCharacterResponse, 
  HxHCharacterFilters, 
  CreateHxHCharacterDTO, 
  UpdateHxHCharacterDTO 
} from "../types/HxHCharacter";
import { ILike, Between, Not } from "typeorm";

export class HxHCharacterService {
  private characterRepository = AppDataSource.getRepository(HxHCharacter);
  
  async create(characterData: CreateHxHCharacterDTO): Promise<HxHCharacterResponse> {
    const existingCharacter = await this.characterRepository.findOne({
      where: { name: characterData.name }
    });
    
    if (existingCharacter) {
      throw new Error(`Ya existe un personaje con el nombre: ${characterData.name}`);
    }

    const newCharacter = this.characterRepository.create(characterData);
    const savedCharacter = await this.characterRepository.save(newCharacter);
    return this.toCharacterResponse(savedCharacter);
  }

  async getById(id: number): Promise<HxHCharacterResponse> {
    const character = await this.characterRepository.findOne({ 
      where: { id } 
    });
    
    if (!character) {
      throw new Error(`Personaje con ID ${id} no encontrado`);
    }
    return this.toCharacterResponse(character);
  }

  async getByName(name: string): Promise<HxHCharacterResponse> {
    const character = await this.characterRepository.findOne({ 
      where: { name } 
    });
    
    if (!character) {
      throw new Error(`Personaje "${name}" no encontrado`);
    }
    return this.toCharacterResponse(character);
  }

  // READ - Buscar personajes con filtros
  async search(filters: HxHCharacterFilters = {}): Promise<HxHCharacterResponse[]> {
    const where: any = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }
    
    if (filters.age) {
      where.age = filters.age;
    }
    
    if (filters.minHeight || filters.maxHeight) {
      where.height = Between(
        filters.minHeight || 1,
        filters.maxHeight || 999
      );
    }
    
    if (filters.minWeight || filters.maxWeight) {
      where.weight = Between(
        filters.minWeight || 1,
        filters.maxWeight || 999
      );
    }

    const characters = await this.characterRepository.find({ where });
    return characters.map(character => this.toCharacterResponse(character));
  }

  // UPDATE - Actualizar personaje completo
  async update(id: number, characterData: UpdateHxHCharacterDTO): Promise<HxHCharacterResponse> {
    // Verificar si el nombre ya existe en otro personaje
    if (characterData.name) {
      const existingCharacter = await this.characterRepository.findOne({
        where: { 
          name: characterData.name, 
          id: Not(id) 
        }
      });
      
      if (existingCharacter) {
        throw new Error(`Ya existe otro personaje con el nombre: ${characterData.name}`);
      }
    }

    await this.characterRepository.update(id, characterData);
    const updatedCharacter = await this.characterRepository.findOne({ 
      where: { id } 
    });

    if (!updatedCharacter) {
      throw new Error(`Personaje con ID ${id} no encontrado`);
    }

    return this.toCharacterResponse(updatedCharacter);
  }

  // UPDATE - Actualización parcial
  async partialUpdate(id: number, updates: Partial<UpdateHxHCharacterDTO>): Promise<HxHCharacterResponse> {
    return this.update(id, updates);
  }

  // DELETE - Eliminar personaje
  async delete(id: number): Promise<{ message: string }> {
    const character = await this.characterRepository.findOne({ 
      where: { id } 
    });
    
    if (!character) {
      throw new Error(`Personaje con ID ${id} no encontrado`);
    }

    await this.characterRepository.delete(id);
    return { message: `Personaje "${character.name}" eliminado correctamente` };
  }

  // DELETE - Eliminar por nombre
  async deleteByName(name: string): Promise<{ message: string }> {
    const character = await this.characterRepository.findOne({ 
      where: { name } 
    });
    
    if (!character) {
      throw new Error(`Personaje "${name}" no encontrado`);
    }

    await this.characterRepository.delete(character.id);
    return { message: `Personaje "${name}" eliminado correctamente` };
  }

  // Método utilitario para formatear respuesta
  private toCharacterResponse(character: HxHCharacter): HxHCharacterResponse {
    return {
      id: character.id.toString(),
      name: character.name,
      age: character.age,
      height: character.height,
      weight: character.weight,
      img: character.img
    };
  }
}