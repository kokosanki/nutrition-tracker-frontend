import type { LoggedFood } from "@/api/mealLogs.ts";
import { getDailyTotals } from "@/utils/food.ts";
import { getTodayLabel } from "@/utils/date.ts";
import styles from "./DailyStatsHeader.module.scss";

interface DailyStatsHeaderProps {
  loggedFoods: LoggedFood[];
}

const DailyStatsHeader = ({ loggedFoods }: DailyStatsHeaderProps) => {
  const totals = getDailyTotals(loggedFoods);

  const macros = [
    { label: "Protein", grams: totals.protein, className: styles.protein },
    { label: "Carbs", grams: totals.carbs, className: styles.carbs },
    { label: "Fat", grams: totals.fat, className: styles.fat },
  ];

  return (
    <header className={styles.statsHeader}>
      <div className={styles.dateBlock}>
        <p className={styles.eyebrow}>Today</p>
        <h1 className={styles.date}>{getTodayLabel()}</h1>
      </div>
      <div className={styles.caloriesCard}>
        <span className={styles.caloriesLabel}>Calories</span>
        <span className={styles.caloriesValue}>
          {totals.calories.toLocaleString()}
        </span>
      </div>
      <ul className={styles.macroRow}>
        {macros.map(({ label, grams, className }) => (
          <li key={label} className={styles.macroCard}>
            <span className={`${styles.macroValue} ${className}`}>{grams}g</span>
            <span className={styles.macroLabel}>{label}</span>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default DailyStatsHeader;
