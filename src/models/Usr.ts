import { Schema, model } from "mongoose";

const usrSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  lastClickAt: { type: Date, default: null }
}, { timestamps: true });

export default model("Usr", usrSchema);
