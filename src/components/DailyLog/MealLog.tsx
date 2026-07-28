import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MEAL_TYPE_LABELS, type MealType } from "@/constants/mealTypes.ts";
import styles from "./MealLog.module.scss";

interface MealLogProps {
  mealType: MealType;
}

const MealLog = ({ mealType }: MealLogProps) => {
  const navigate = useNavigate();
  const label = MEAL_TYPE_LABELS[mealType];

  return (
    <div>
      <h2>{label}</h2>
      <button
        onClick={() => navigate(`/mealLog/${mealType}`)}
        className={styles.logButton}
        type="button"
        aria-label={`Add food to ${label}`}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default MealLog;
