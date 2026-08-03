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
  amount: number;
  loggedDate: string;
  mealType: MealType;
}

export interface LoggedFood extends LogFoodPayload {
  id: number;
}

export interface MealJournalResults {
  loggedFoods: LoggedFood[];
}

export const logFood = (payload: LogFoodPayload): Promise<void> => {
  return apiFetch<void>("/logs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getFoodJournal = (date: string): Promise<MealJournalResults> => {
  return apiFetch<MealJournalResults>(`/logs?date=${date}`, {
    method: "GET",
  });
};

export const deleteLoggedFood = (id: number): Promise<void> => {
  return apiFetch<void>(`/logs/${id}`, {
    method: "DELETE",
  });
};

export interface UpdateLogPayload {
  amount?: number;
  mealType?: MealType;
  loggedDate?: string;
}

export const updateLoggedFood = (id: number, payload: UpdateLogPayload): Promise<void> => {
  return apiFetch<void>(`/logs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

