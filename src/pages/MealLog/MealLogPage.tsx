import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PageShell from "@/modules/PageShell/PageShell";
import Header from "@/modules/Header/Header";
import SearchInput from "@/modules/SearchInput/SearchInput";
import FoodSearchResults from "@/modules/FoodSearchResults";
import { useFoodSearch } from "@/hooks/useFoodSearch";
import { isMealType, MEAL_TYPE_LABELS } from "@/constants/mealTypes.ts";
import type { Food } from "@/api/foods.ts";
import styles from "./MealLogPage.module.scss";

const MealLogPage = () => {
  const { mealType } = useParams<{ mealType: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { results } = useFoodSearch(query);

  if (!isMealType(mealType)) {
    return <Navigate to="/" replace />;
  }

  const handleSearch = (searchText: string): void => {
    setSearchParams(searchText ? { q: searchText } : {});
  };

  const handleSelect = (food: Food): void => {
    const backTo = query
      ? `/mealLog/${mealType}?${searchParams.toString()}`
      : `/mealLog/${mealType}`;
    navigate(`/mealLog/${mealType}/foods/${food.offId}`, { state: { food, backTo } });
  };

  return (
    <PageShell center={false}>
      <Header />
      <Link to="/" className={styles.backLink}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <h1>{MEAL_TYPE_LABELS[mealType]}</h1>
      <SearchInput placeholder="Search for a food" defaultValue={query} onSearch={handleSearch} />
      <FoodSearchResults results={results} onSelect={handleSelect} />
    </PageShell>
  );
};

export default MealLogPage;
