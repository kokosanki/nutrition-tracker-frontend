import type { Food } from "@/api/foods.ts";
import { getServingDisplay } from "@/utils/food.ts";
import styles from "./FoodServingSummary.module.scss";

interface FoodServingSummaryProps {
  food: Food;
  className?: string;
}

const FoodServingSummary = ({ food, className }: FoodServingSummaryProps) => {
  const { caloriesLabel, servingSize, servingUnit, caloriesPerCorrectedServingSize } =
    getServingDisplay(food);

  const classes = [styles.details, className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {caloriesPerCorrectedServingSize ?? "?"} kcal {caloriesLabel} · {servingSize}
      {servingUnit} serving
    </span>
  );
};

export default FoodServingSummary;
