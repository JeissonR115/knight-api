// server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import KnightRoutes from "./routes/knightRoutes";

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/knights", KnightRoutes);

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async (): Promise<void> => {
  try {
    console.log(`Iniciando servidor en modo ${NODE_ENV}...`);
    console.log("Conectando a la Base de Datos...");

    await connectDB();

    console.log("Conectado correctamente a la Base de Datos");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

startServer();
