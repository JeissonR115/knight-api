import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger";
import { RegisterRoutes } from "./generated/routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config(); 

export const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

RegisterRoutes(app);
setupSwagger(app);


const {PORT, NODE_ENV, HOST} = process.env;

const startServer = async (): Promise<void> => {
  try {
    console.log(`Iniciando servidor en modo ${NODE_ENV}...`);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en ${HOST}:${PORT}`);
      console.log(`Swagger Docs: ${HOST}:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}