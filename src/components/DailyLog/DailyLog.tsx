import { useState } from "react";
import styles from "./DailyLog.module.scss";
import MealLog from "@/components/MealLog/MealLog";
import DailyStatsHeader from "@/components/DailyStatsHeader/DailyStatsHeader";
import { MEAL_TYPES } from "@/constants/mealTypes.ts";
import { useFoodJournal } from "@/hooks/useFoodJournal.ts";
import { addDays, getTodayDateString } from "@/utils/date.ts";

const DailyLog = () => {
  const [date, setDate] = useState(getTodayDateString());
  const { loggedFoods, isLoading, error } = useFoodJournal(date);

  const handlePrevDay = () => setDate((current) => addDays(current, -1));
  const handleNextDay = () => setDate((current) => addDays(current, 1));
  const handleToday = () => setDate(getTodayDateString());
  const handleSelectDate = (selectedDate: string) => setDate(selectedDate);

  return (
    <div className={styles.dailyLog}>
      <DailyStatsHeader
        date={date}
        loggedFoods={loggedFoods}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
        onToday={handleToday}
        onSelectDate={handleSelectDate}
      />
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
