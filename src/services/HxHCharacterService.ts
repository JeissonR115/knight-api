import { 
  HxHCharacterResponse,
  HxHCharacterFilters,
  CreateHxHCharacterDTO,
  UpdateHxHCharacterDTO
} from "../types/HxHCharacter";
import { AppError } from "../middleware/errorHandler";
const URL_BASE = "/api/hxh-characters";
export class HxHCharacterService {
  private MONGO_API: string;
  private SQL_API: string;

  constructor() {
    this.MONGO_API = process.env.MONGO_API?.trim() ?? "";
    this.SQL_API = process.env.SQL_API?.trim() ?? "";

    if (!this.MONGO_API || !this.SQL_API) {
      console.warn("⚠️ MONGO_API o SQL_API no están definidas en .env");
    }
  }

  /** 🔄 Fallback entre APIs remotas */
  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const endpoints = [
      { name: "SQL API", url: this.SQL_API },
      { name: "Mongo API", url: this.MONGO_API },
      
    ];

    let lastError: any = null;

    for (const api of endpoints) {
      try {
        const url = api.url + path;
        console.log(`➡️ Intentando ${api.name}: ${url}`);

        const res = await fetch(url, options);

        if (!res.ok) {
          throw new Error(`Status: ${res.status}`);
        }

        return (await res.json()) as T;
      } catch (error) {
        console.error(`❌ Error en ${api.name}:`, error);
        lastError = error;
      }
    }

    throw new AppError("Ninguna API respondió correctamente", 503);
  }


  async search(filters: HxHCharacterFilters = {}): Promise<HxHCharacterResponse[]> {
    const params = Object.entries(filters)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [k, String(v)]) as [string, string][];

    const query = new URLSearchParams(params).toString();

    return this.request<HxHCharacterResponse[]>(`${URL_BASE}?${query}`);
  }

  async getById(id: number): Promise<HxHCharacterResponse> {
    return this.request<HxHCharacterResponse>(`${URL_BASE}/${id}`);
  }

  async create(data: CreateHxHCharacterDTO): Promise<HxHCharacterResponse> {
    return this.request<HxHCharacterResponse>(`${URL_BASE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }
  async update(id: number, data: UpdateHxHCharacterDTO): Promise<HxHCharacterResponse> {
    return this.request<HxHCharacterResponse>(`${URL_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  async partialUpdate(id: number, data: Partial<UpdateHxHCharacterDTO>): Promise<HxHCharacterResponse> {
    return this.update(id, data);
  }

  async delete(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`${URL_BASE}/${id}`, {
      method: "DELETE"
    });
  }

  async statsSummary(): Promise<{
    total: number;
    averageAge: number;
    averageHeight: number;
    averageWeight: number;
  }> {
    return this.request<{
      total: number;
      averageAge: number;
      averageHeight: number;
      averageWeight: number;
    }>(`${URL_BASE}/stats/summary`);
  }
}
