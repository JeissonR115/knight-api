// types/hxh-character.ts
export interface HxHCharacterResponse {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  img: string;
}

export interface HxHCharacterFilters {
  name?: string;
  age?: number;
  minHeight?: number;
  maxHeight?: number;
  minWeight?: number;
  maxWeight?: number;
}

export interface CreateHxHCharacterDTO {
  name: string;
  age: number;
  email: string;
  height: number;
  weight: number;
  img: string;
}

export interface UpdateHxHCharacterDTO {
  name?: string;
  age?: number;
  height?: number;
  weight?: number;
  img?: string;
}