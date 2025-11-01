import e from "express";
import mongoose, { Schema, Document } from "mongoose";
import { KnightResponse } from "../types/knight";

export interface IKnight extends Document, KnightResponse {}

const knightSchema = new Schema<IKnight>({
  name: { type: String, required: true },
  armor: { type: String, required: true },
  rank: { type: String, enum: ["Bronze", "Silver", "Gold"], default: "Bronze" },
  power: { type: Number, default: 0 },
  img: {type: String, default: null}
});

const Knight = mongoose.model<IKnight>("Knight", knightSchema);

export default Knight;
