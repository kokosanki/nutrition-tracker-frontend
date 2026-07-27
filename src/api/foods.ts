import { apiFetch } from "./client.ts";

export interface Food {
  name: string | undefined;
  offId: string | undefined;
  caloriesPer100g: number | null;
  proteinPer100g: number | null;
  carbsPer100g: number | null;
  fatPer100g: number | null;
}

export const searchFoods = (query: string): Promise<Food[]> => {
  return apiFetch<Food[]>(`/foods/search?q=${encodeURIComponent(query)}&limit=20`);
};
