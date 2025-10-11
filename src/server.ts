import "reflect-metadata";
import cors from "cors";
import express from "express";
import { AppDataSource } from "./config/db";
import PokemonRoutes from "./routes/PokemonRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pokemons", PokemonRoutes);

const startServer = async () => {
  try {
    console.log("Conectando a la base de datos...");
    await AppDataSource.initialize();

    console.log("Base de datos conectada correctamente");

    app.listen(3001, () => {
      console.log("Servidor corriendo en http://localhost:3001");
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

startServer();
