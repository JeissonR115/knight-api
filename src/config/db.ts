// db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error("No se encontró MONGO_URI en el archivo .env");
    }

    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
};
