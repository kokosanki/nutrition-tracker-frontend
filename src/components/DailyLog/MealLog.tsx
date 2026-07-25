import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./MealLog.module.scss";

const MealLog = () => {
  const logIt = (): void => console.log("logIt");

  return (
    <div>
      <h2>Breakfast</h2>
      <button
        onClick={logIt}
        className={styles.logButton}
        type="button"
        aria-label="Log out"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default MealLog;
