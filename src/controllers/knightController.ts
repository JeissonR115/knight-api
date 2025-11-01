import { Controller, Get, Query, Route } from 'tsoa';
import { KnightService } from "../services/knightService";
import { KnightResponse } from "../types/knight";

@Route("api/knights")
export class KnightController extends Controller {
  private service = new KnightService();

  @Get("/")
  public async getAll(): Promise<KnightResponse[]> {
    return await this.service.getAll();
  }

  @Get("/search/name")
  public async searchByName(@Query() name: string): Promise<KnightResponse[]> {
    try {
      if (!name) {
        this.setStatus(400);
        return [];
      }
      return await this.service.searchByName(name);
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Get("/search")
  public async search(
    @Query() name?: string,
    @Query() armor?: string,
    @Query() rank?: string
  ): Promise<KnightResponse[]> {
    try {
      return await this.service.search({ name, armor, rank });
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }
}