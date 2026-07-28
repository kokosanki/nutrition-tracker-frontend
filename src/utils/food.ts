import type { Food } from "@/api/foods.ts";

export const getServingDisplay = (food: Food) => {
  const hasServingSize = food.serving != null;
  const servingSize = hasServingSize ? food.serving : '100g';
  const servingSizeMatch = String(servingSize).match(/(\d+(?:\.\d+)?)\s*(?:g|ml)\b/i);
  const servingSizeQuantity = servingSizeMatch ? parseFloat(servingSizeMatch[1]) : null;
  const caloriesLabel = hasServingSize ? "per serving" : "per 100g";
  const endsInLetter = /[a-zA-Z]$/.test(String(servingSize));
  const servingUnit = endsInLetter ? "" : "g";

  return { caloriesLabel, servingSize, servingSizeQuantity, servingUnit };
};
