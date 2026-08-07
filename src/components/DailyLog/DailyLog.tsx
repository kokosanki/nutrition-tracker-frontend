import styles from "./DailyLog.module.scss";
import MealLog from "@/components/MealLog/MealLog";
import DailyStatsHeader from "@/components/DailyStatsHeader/DailyStatsHeader";
import { MEAL_TYPES } from "@/constants/mealTypes.ts";
import { useFoodJournal } from "@/hooks/useFoodJournal.ts";
import { getTodayDateString } from "@/utils/date.ts";

const DailyLog = () => {
  const date = getTodayDateString();
  const { loggedFoods, isLoading, error } = useFoodJournal(date);

  return (
    <div className={styles.dailyLog}>
      <DailyStatsHeader loggedFoods={loggedFoods} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {MEAL_TYPES.map((mealType) => (
        <MealLog
          key={mealType}
          mealType={mealType}
          items={loggedFoods.filter((food) => food.mealType === mealType)}
        />
      ))}
    </div>
  );
};

export default DailyLog;
