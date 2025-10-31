import mongoose, { Schema, Document } from "mongoose";

export interface IKnight extends Document {
  name: string;
  armor: string;
  rank: "Bronze" | "Silver" | "Gold";
  power: number;
  img?: string | null;
}

const knightSchema = new Schema<IKnight>({
  name: { type: String, required: true },
  armor: { type: String, required: true },
  rank: { type: String, enum: ["Bronze", "Silver", "Gold"], default: "Bronze" },
  power: { type: Number, default: 0 },
  img: {type: String, default: null}
});

const Knight = mongoose.model<IKnight>("Knight", knightSchema);

export default Knight;
