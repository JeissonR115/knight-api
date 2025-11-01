// db.ts (o data-source.ts)
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import HxHCharacter  from "../models/HxHCharacter";

dotenv.config();
const { DATABASE_URL, DB_HOST, NODE_ENV} = process.env;
export const AppDataSource = new DataSource({
  type: "postgres",
  url: DATABASE_URL,
  entities: [HxHCharacter],
  synchronize: false, 
  logging: false,
  ssl: NODE_ENV === "server" ? { rejectUnauthorized: false } : false,
});

export const connectDB = async (): Promise<void> => {
  try {
    if (!DB_HOST && !DATABASE_URL) {
      throw new Error("No se encontraron las variables de conexión a PostgreSQL en el archivo .env");
    }

    await AppDataSource.initialize();
    console.log("✅ Conectado a PostgreSQL");
  } catch (error) {
    console.error("❌ Error conectando a PostgreSQL:", error);
    process.exit(1);
  }
};