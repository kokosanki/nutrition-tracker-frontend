import type { Food } from "@/api/foods.ts";
import FoodServingSummary from "@/modules/FoodServingSummary/FoodServingSummary";
import FoodListItem from "@/modules/FoodListItem/FoodListItem";
import styles from "@/modules/FoodListItem/FoodListItem.module.scss";

interface FoodSearchResultsProps {
  results: Food[];
  onSelect: (food: Food) => void;
}

const FoodSearchResults = ({ results, onSelect }: FoodSearchResultsProps) => {
  return (
    <ul className={styles.list}>
      {results.map((food, index) => (
        <FoodListItem
          key={food.offId ?? index}
          name={food.name ?? ""}
          details={<FoodServingSummary food={food} />}
          onClick={() => onSelect(food)}
        />
      ))}
    </ul>
  );
};

export default FoodSearchResults;
