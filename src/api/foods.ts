import { apiFetch } from "./client.ts";

export interface Food {
  name: string | undefined;
  offId: string | undefined;
  caloriesPer100g: number | null;
  proteinPer100g: number | null;
  carbsPer100g: number | null;
  fatPer100g: number | null;
  serving: number | null;
}

export interface FoodResults {
  results: Food[];
}

export const searchFoods = (query: string): Promise<FoodResults> => {
  return apiFetch<FoodResults>(
    `/foods/search?q=${encodeURIComponent(query)}&limit=20`,
  );
};

