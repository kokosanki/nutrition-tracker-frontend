import type { Food } from "@/api/foods.ts";
import FoodServingSummary from "@/modules/FoodServingSummary/FoodServingSummary";
import styles from "./FoodSearchResults.module.scss";

interface FoodSearchResultsProps {
  results: Food[];
  onSelect: (food: Food) => void;
}

const FoodSearchResults = ({ results, onSelect }: FoodSearchResultsProps) => {
  return (
    <ul className={styles.list}>
      {results.map((food, index) => (
        <li key={food.offId ?? index} className={styles.item}>
          <button
            type="button"
            className={styles.itemButton}
            onClick={() => onSelect(food)}
          >
            <span className={styles.name}>{food.name}</span>
            <FoodServingSummary food={food} className={styles.details} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FoodSearchResults;
