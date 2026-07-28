import { apiFetch } from "./client.ts";
import type { MealType } from "@/constants/mealTypes.ts";

export interface LogFoodPayload {
  loggedDate: string;
  mealType: MealType;
  productName: string;
  offId?: string;
  amountGrams: number;
  caloriesPer100g: number;
  proteinPer100g?: number;
  carbsPer100g?: number;
  fatPer100g?: number;
}

export const logFood = (payload: LogFoodPayload): Promise<void> => {
  return apiFetch<void>("/logs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
