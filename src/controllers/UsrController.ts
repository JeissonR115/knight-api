import { Controller, Get, Query, Route, Put, Post, Body } from 'tsoa';
import { UsrService } from "../services/UsrService";
import { CreateUsrDTO, UpdateUsrDTO, UsrResponse } from "../types/usr";

@Route("api/usrs")
export class UsrController extends Controller {
  private service = new UsrService();

  @Get("/")
  public async searchByName(@Query() name: string): Promise<UsrResponse[]> {
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

  @Put("/{id}")
  public async updateUsr(
    id: string,
    @Body() data: UpdateUsrDTO
  ): Promise<UsrResponse> {
    try {
      if (!data) {
        this.setStatus(400);
        throw new Error("No hay datos para actualizar");
      }

      return await this.service.updateUsr(id, data);
    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }

  @Post("/")
  public async createUsr(
    @Body() data: CreateUsrDTO
  ): Promise<UsrResponse> {
    try {
      if (!data.name || !data.lastName || !data.email) {
        this.setStatus(400);
        throw new Error("name, lastName y email son requeridos");
      }

      const created = await this.service.createUsr(data);
      this.setStatus(201);
      return created;

    } catch (error: any) {
      this.setStatus(400);
      throw error;
    }
  }
}
