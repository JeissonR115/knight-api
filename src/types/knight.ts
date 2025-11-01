export interface KnightResponse {
  name: string;
  armor: string;
  rank: "Bronze" | "Silver" | "Gold";
  power: number;
  img?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KnightFilters {
  name?: string;
  armor?: string;
  rank?: string;
}