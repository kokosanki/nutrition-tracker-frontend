import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useWaterLog } from "@/hooks/useWaterLog.ts";
import { useLogWater } from "@/hooks/useLogWater.ts";
import styles from "./WaterLog.module.scss";

const QUICK_AMOUNTS = [250, 500];

interface WaterLogProps {
  date: string;
}

const WaterLog = ({ date }: WaterLogProps) => {
  const navigate = useNavigate();
  const { totalMl, isLoading, error: loadError } = useWaterLog(date);
  const { logWater, isLoading: isLogging, error: logError } = useLogWater();

  const error = loadError ?? logError;

  return (
    <div className={styles.waterLog}>
      <div className={styles.info}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faDroplet} />
        </span>
        <div>
          <p className={styles.amount}>
            {isLoading ? "…" : `${totalMl.toLocaleString()} ml`}
          </p>
          <p className={styles.label}>Water logged today</p>
        </div>
      </div>
      <div className={styles.actions}>
        {QUICK_AMOUNTS.map((amountMl) => (
          <button
            key={amountMl}
            type="button"
            className={styles.quickAdd}
            onClick={() => logWater({ amountMl, loggedDate: date })}
            disabled={isLogging}
          >
            {amountMl} ml
          </button>
        ))}
        <button
          type="button"
          className={styles.logButton}
          onClick={() => navigate("/water", { state: { date, backTo: "/" } })}
          aria-label="View water log details"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default WaterLog;
