// controllers/knightController.ts
import { Request, Response } from "express";
import { KnightService } from "../services/knightService";

const service = new KnightService();

export const knightController = {
  async getAll(req: Request, res: Response) {
    const knights = await service.getAll();
    res.json(knights);
  },

  async getById(req: Request, res: Response) {
    const knight = await service.getById(req.params.id);
    res.json(knight);
  },

  async searchByName(req: Request, res: Response) {
    const knights = await service.searchByName(req.query.name as string);
    res.json(knights);
  },

  async search(req: Request, res: Response) {
    const results = await service.search(req.query);
    res.json(results);
  },
};
