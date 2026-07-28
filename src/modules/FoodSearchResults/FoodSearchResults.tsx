import type { Food } from "@/api/foods.ts";
import { getServingDisplay } from "@/utils/food.ts";
import styles from "./FoodSearchResults.module.scss";

interface FoodSearchResultsProps {
  results: Food[];
  onSelect: (food: Food) => void;
}

const FoodSearchResults = ({ results, onSelect }: FoodSearchResultsProps) => {
  return (
    <ul className={styles.list}>
      {results.map((food, index) => {
        const { caloriesLabel, servingSize, servingUnit } = getServingDisplay(food);

        return (
          <li key={food.offId ?? index} className={styles.item}>
            <button
              type="button"
              className={styles.itemButton}
              onClick={() => onSelect(food)}
            >
              <span className={styles.name}>{food.name}</span>
              <span className={styles.details}>
                {food.caloriesPer100g ?? "?"} kcal {caloriesLabel} · {servingSize}
                {servingUnit} serving
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default FoodSearchResults;
