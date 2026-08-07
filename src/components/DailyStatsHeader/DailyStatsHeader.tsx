import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { LoggedFood } from "@/api/mealLogs.ts";
import { getDailyTotals } from "@/utils/food.ts";
import { getDateLabel, getTodayDateString } from "@/utils/date.ts";
import styles from "./DailyStatsHeader.module.scss";

interface DailyStatsHeaderProps {
  date: string;
  loggedFoods: LoggedFood[];
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

const DailyStatsHeader = ({ date, loggedFoods, onPrevDay, onNextDay, onToday }: DailyStatsHeaderProps) => {
  const totals = getDailyTotals(loggedFoods);
  const isToday = date === getTodayDateString();

  const macros = [
    { label: "Protein", grams: totals.protein, className: styles.protein },
    { label: "Carbs", grams: totals.carbs, className: styles.carbs },
    { label: "Fat", grams: totals.fat, className: styles.fat },
  ];

  return (
    <header className={styles.statsHeader}>
      <div className={styles.dateBlock}>
        <div className={styles.eyebrowRow}>
          {isToday ? (
            <p className={styles.eyebrow}>Today</p>
          ) : (
            <button type="button" className={styles.todayButton} onClick={onToday}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back to today
            </button>
          )}
        </div>
        <div className={styles.dateNav}>
          <button
            type="button"
            className={styles.navButton}
            onClick={onPrevDay}
            aria-label="Previous day"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h1 className={styles.date}>{getDateLabel(date)}</h1>
          <button
            type="button"
            className={styles.navButton}
            onClick={onNextDay}
            aria-label="Next day"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
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
