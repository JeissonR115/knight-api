import { Controller, Get, Query, Route, Tags, Post, Put, Delete, Path, Body } from 'tsoa';
import { HxHCharacterService } from '../services/HxHCharacterService';
import { HxHCharacterResponse, HxHCharacterFilters, CreateHxHCharacterDTO, UpdateHxHCharacterDTO } from "../types/HxHCharacter";

@Route("api/hxh-characters")
@Tags("HxH Characters")
export class HxHCharacterController extends Controller {
  private service = new HxHCharacterService();

  @Get()
  public async searchCharacters(
    @Query() name?: string,
    @Query() age?: number,
    @Query() minHeight?: number,
    @Query() maxHeight?: number,
    @Query() minWeight?: number,
    @Query() maxWeight?: number
  ): Promise<HxHCharacterResponse[]> {
    const filters: HxHCharacterFilters = { name, age, minHeight, maxHeight, minWeight, maxWeight };
    return await this.service.search(filters);
  }

  @Get("{id}")
  public async getCharacterById(@Path() id: string): Promise<HxHCharacterResponse> {
    return await this.service.getById(id);
  }

  @Post()
  public async createCharacter(@Body() characterData: CreateHxHCharacterDTO): Promise<HxHCharacterResponse> {
    const newCharacter = await this.service.create(characterData);
    this.setStatus(201);
    return newCharacter;
  }

  @Put("{id}")
  public async updateCharacter(
    @Path() id: string,
    @Body() characterData: UpdateHxHCharacterDTO
  ): Promise<HxHCharacterResponse> {
    return await this.service.update(id, characterData);
  }

  @Delete("{id}")
  public async deleteCharacter(@Path() id: string): Promise<{ message: string }> {
    return await this.service.delete(id);
  }

  @Get("stats/summary")
  public async getCharactersStats(): Promise<{
    total: number;
    averageAge: number;
    averageHeight: number;
    averageWeight: number;
  }> {
    const characters = await this.service.search();

    if (characters.length === 0) {
      return { total: 0, averageAge: 0, averageHeight: 0, averageWeight: 0 };
    }

    const totalAge = characters.reduce((sum, c) => sum + c.age, 0);
    const totalHeight = characters.reduce((sum, c) => sum + c.height, 0);
    const totalWeight = characters.reduce((sum, c) => sum + c.weight, 0);

    return {
      total: characters.length,
      averageAge: Math.round(totalAge / characters.length),
      averageHeight: Math.round(totalHeight / characters.length),
      averageWeight: Math.round(totalWeight / characters.length),
    };
  }
}
