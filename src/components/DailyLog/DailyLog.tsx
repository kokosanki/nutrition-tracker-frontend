import styles from "./DailyLog.module.scss";
import MealLog from "./MealLog";

const DailyLog = () => {
  return (
    <div
        className={styles.dailyLog}>
      daily log
      <MealLog />
    </div>
  );
};

export default DailyLog;
