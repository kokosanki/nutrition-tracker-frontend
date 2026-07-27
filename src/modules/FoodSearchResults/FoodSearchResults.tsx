import type { Food } from "@/api/foods.ts";
import styles from "./FoodSearchResults.module.scss";

interface FoodSearchResultsProps {
  results: Food[];
}

const FoodSearchResults = ({ results }: FoodSearchResultsProps) => {
  return (
    <ul className={styles.list}>
      {results.map((food, index) => {
        const hasServingSize = food.serving != null;
        const servingSize = hasServingSize ? food.serving : 100;
        const caloriesLabel = hasServingSize ? "per serving" : "per 100g";
        const endsInLetter = /[a-zA-Z]$/.test(String(servingSize));
        const servingUnit = endsInLetter ? "" : "g";

        return (
          <li key={food.offId ?? index} className={styles.item}>
            <span className={styles.name}>{food.name}</span>
            <span className={styles.details}>
              {food.caloriesPer100g ?? "?"} kcal {caloriesLabel} · {servingSize}
              {servingUnit} serving
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default FoodSearchResults;

