import { apiFetch } from "./client.ts";
import type { MealType } from "@/constants/mealTypes.ts";

export interface LogFoodPayload {
  name: string;
  offId?: string;
  serving?: string | null;
  caloriesPer100g: number | null;
  proteinPer100g?: number | null;
  carbsPer100g?: number | null;
  fatPer100g?: number | null;
  amountGrams: number;
  loggedDate: string;
  mealType: MealType;
}

export const logFood = (payload: LogFoodPayload): Promise<void> => {
  return apiFetch<void>("/logs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
