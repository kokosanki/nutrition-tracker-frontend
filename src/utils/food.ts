import type { Food } from "@/api/foods.ts";
import type { LoggedFood } from "@/api/mealLogs.ts";

export const getLoggedFoodCalories = (food: {
  caloriesPer100g: number | null;
  amount: number;
}) =>
  food.caloriesPer100g != null
    ? Math.round((food.caloriesPer100g * food.amount) / 100)
    : null;

const sumPer100g = (
  loggedFoods: LoggedFood[],
  key: "caloriesPer100g" | "proteinPer100g" | "carbsPer100g" | "fatPer100g",
) =>
  loggedFoods.reduce((total, food) => {
    const perGram = food[key];
    return perGram != null ? total + (perGram * food.amount) / 100 : total;
  }, 0);

export const getDailyTotals = (loggedFoods: LoggedFood[]) => ({
  calories: Math.round(sumPer100g(loggedFoods, "caloriesPer100g")),
  protein: Math.round(sumPer100g(loggedFoods, "proteinPer100g")),
  carbs: Math.round(sumPer100g(loggedFoods, "carbsPer100g")),
  fat: Math.round(sumPer100g(loggedFoods, "fatPer100g")),
});

export const getServingUnit = (
  serving: string | number | null | undefined,
): "g" | "ml" => {
  const match =
    serving != null
      ? String(serving).match(/(\d+(?:\.\d+)?)\s*(g|ml)\b/i)
      : null;
  return match?.[2]?.toLowerCase() === "ml" ? "ml" : "g";
};

export const getServingDisplay = (food: Food) => {
  const hasServingSize = food.serving != null;
  const servingSize = hasServingSize ? food.serving : "100g";
  const servingSizeMatch = String(servingSize).match(
    /(\d+(?:\.\d+)?)\s*(g|ml)\b/i,
  );
  const servingSizeQuantity = servingSizeMatch
    ? parseFloat(servingSizeMatch[1])
    : null;
  const caloriesLabel = hasServingSize ? "per serving" : "per 100g";
  const endsInLetter = /[a-zA-Z]$/.test(String(servingSize));
  const unit = getServingUnit(servingSize);
  const servingUnit = endsInLetter ? "" : unit;
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
    unit,
    correctedServingSize,
    caloriesPerCorrectedServingSize,
  };
};
