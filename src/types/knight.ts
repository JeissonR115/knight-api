export interface KnightResponse {
  name: string;
  armor: string;
  rank: "Bronze" | "Silver" | "Gold";
  power: number;
  img?: string | null;
}

export interface KnightFilters {
  name?: string;
  armor?: string;
  rank?: string;
}