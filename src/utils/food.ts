import type { Food } from "@/api/foods.ts";

export const getLoggedFoodCalories = (food: {
  caloriesPer100g: number | null;
  amountGrams: number;
}) =>
  food.caloriesPer100g != null
    ? Math.round((food.caloriesPer100g * food.amountGrams) / 100)
    : null;

export const getServingDisplay = (food: Food) => {
  const hasServingSize = food.serving != null;
  const servingSize = hasServingSize ? food.serving : '100g';
  const servingSizeMatch = String(servingSize).match(/(\d+(?:\.\d+)?)\s*(?:g|ml)\b/i);
  const servingSizeQuantity = servingSizeMatch ? parseFloat(servingSizeMatch[1]) : null;
  const caloriesLabel = hasServingSize ? "per serving" : "per 100g";
  const endsInLetter = /[a-zA-Z]$/.test(String(servingSize));
  const servingUnit = endsInLetter ? "" : "g";
  const correctedServingSize = servingSizeQuantity ?? 100;
  const caloriesPerCorrectedServingSize =
    food.caloriesPer100g != null
      ? Math.round((food.caloriesPer100g * correctedServingSize) / 100)
      : null;

  return {
    caloriesLabel,
    servingSize,
    servingSizeQuantity,
    servingUnit,
    correctedServingSize,
    caloriesPerCorrectedServingSize,
  };
};
