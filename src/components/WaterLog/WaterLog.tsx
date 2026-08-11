import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { useWaterLog } from "@/hooks/useWaterLog.ts";
import styles from "./WaterLog.module.scss";

interface WaterLogProps {
  date: string;
}

const WaterLog = ({ date }: WaterLogProps) => {
  const { totalMl, isLoading, error } = useWaterLog(date);

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
        <button type="button" className={styles.quickAdd}>
          +250
        </button>
        <button type="button" className={styles.quickAdd}>
          +500
        </button>
        <button type="button" className={styles.logButton}>
          Log water
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default WaterLog;
