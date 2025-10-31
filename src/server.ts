// server.ts
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db"; 
import KnightRoutes from "./routes/knightRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/knights", KnightRoutes);

const startServer = async () => {
  try {
    console.log("Conectando a MongoDB Atlas...");
    await connectDB();

    console.log("✅ Conectado correctamente a MongoDB Atlas");

    app.listen(3001, () => {
      console.log("Servidor corriendo en http://localhost:3001");
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

startServer();
