// db.ts
import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://jeissonfeliper:jr115@knightscluster.plypbyv.mongodb.net/?appName=knightsCluster"
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("Error conectando a MongoDB", error);
  }
};
