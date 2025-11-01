import mongoose, { Schema, Document } from 'mongoose';

export interface IHxHCharacter extends Document {
  name: string;
  age: number;
  height: number;
  weight: number;
  img: string;
}

const HxHCharacterSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  age: { 
    type: Number, 
    required: true,
    min: 1 
  },
  height: { 
    type: Number, 
    required: true,
    min: 1 
  },
  weight: { 
    type: Number, 
    required: true,
    min: 1 
  },
  img: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

const HxHCharacter = mongoose.model<IHxHCharacter>('HxHCharacter', HxHCharacterSchema);
export default HxHCharacter;
