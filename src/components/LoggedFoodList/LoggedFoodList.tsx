import type { LoggedFood } from "@/api/mealLogs.ts";
import { getLoggedFoodCalories, getServingUnit } from "@/utils/food.ts";
import FoodListItem from "@/modules/FoodListItem/FoodListItem";
import listStyles from "@/modules/FoodListItem/FoodListItem.module.scss";
import styles from "./LoggedFoodList.module.scss";

interface LoggedFoodListProps {
  items: LoggedFood[];
}

const LoggedFoodList = ({ items }: LoggedFoodListProps) => {
  if (items.length === 0) {
    return <p className={styles.empty}>No items logged yet.</p>;
  }

  return (
    <ul className={listStyles.list}>
      {items.map((item) => (
        <FoodListItem
          key={item.id}
          name={item.name}
          details={`${getLoggedFoodCalories(item) ?? "?"} kcal · ${item.amount}${getServingUnit(item.serving)}`}
        />
      ))}
    </ul>
  );
};

export default LoggedFoodList;

