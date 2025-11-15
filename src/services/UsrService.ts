import Usr from "../models/Usr"; 
import { 
  UsrResponse, 
  CreateUsrDTO, 
  UpdateUsrDTO 
} from "../types/usr";

export class UsrService {

  // CREATE - Crear usuario
  async createUsr(data: CreateUsrDTO): Promise<UsrResponse> {
    const existing = await Usr.findOne({ email: data.email });
    if (existing) {
      throw new Error(`Ya existe un usuario con el email: ${data.email}`);
    }

    const newUsr = new Usr({
      ...data,
      lastClickAt: null
    });

    const saved = await newUsr.save();
    return this.toUsrResponse(saved);
  }

  // READ - Buscar por nombre
  async searchByName(name: string): Promise<UsrResponse[]> {
    const users = await Usr.find({
      name: { $regex: new RegExp(name, "i") }
    });

    return users.map(u => this.toUsrResponse(u));
  }

  // READ - Obtener por ID
  async getById(id: string): Promise<UsrResponse> {
    const user = await Usr.findById(id);
    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    return this.toUsrResponse(user);
  }

  // UPDATE - NO permite actualizar email
  async updateUsr(id: string, data: UpdateUsrDTO): Promise<UsrResponse> {

    // Si mandan email, lo ignoramos
    if (data.email) {
      delete data.email;
    }

    const updated = await Usr.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    return this.toUsrResponse(updated);
  }

  // UPDATE parcial
  async partialUpdate(id: string, patch: Partial<UpdateUsrDTO>): Promise<UsrResponse> {
    if (patch.email) delete patch.email;
    return this.updateUsr(id, patch);
  }

  // DELETE por ID
  async delete(id: string): Promise<{ message: string }> {
    const deleted = await Usr.findByIdAndDelete(id);

    if (!deleted) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    return { message: `Usuario "${deleted.name}" eliminado correctamente` };
  }

  // DELETE por email
  async deleteByEmail(email: string): Promise<{ message: string }> {
    const deleted = await Usr.findOneAndDelete({ email });

    if (!deleted) {
      throw new Error(`Usuario con email "${email}" no encontrado`);
    }

    return { message: `Usuario "${email}" eliminado correctamente` };
  }

  // Mapper
  private toUsrResponse(usr: any): UsrResponse {
    return {
      id: usr._id.toString(),
      name: usr.name,
      lastName: usr.lastName,
      email: usr.email,
      lastClickAt: usr.lastClickAt
    };
  }
}
