import styles from "./DailyLog.module.scss";
import MealLog from "./MealLog";
import { MEAL_TYPES } from "@/constants/mealTypes.ts";

const DailyLog = () => {
  return (
    <div className={styles.dailyLog}>
      daily log
      {MEAL_TYPES.map((mealType) => (
        <MealLog key={mealType} mealType={mealType} />
      ))}
    </div>
  );
};

export default DailyLog;
