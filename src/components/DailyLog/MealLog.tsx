import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "@/modules/SearchInput/SearchInput";
import FoodSearchResults from "@/modules/FoodSearchResults/FoodSearchResults";
import { useFoodSearch } from "@/hooks/useFoodSearch";
import styles from "./MealLog.module.scss";

const MealLog = () => {
  const logIt = (): void => console.log("logIt");
  const { search, results } = useFoodSearch();

  return (
    <div>
      <h2>Breakfast</h2>
      <SearchInput placeholder="Search for a food" onSearch={search} />
      <FoodSearchResults results={results} />
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
