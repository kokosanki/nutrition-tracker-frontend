import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PageShell from "@/modules/PageShell/PageShell";
import Header from "@/modules/Header/Header";
import { useLogFood } from "@/hooks/useLogFood";
import { isMealType, MEAL_TYPE_LABELS } from "@/constants/mealTypes.ts";
import { getServingDisplay } from "@/utils/food.ts";
import FoodServingSummary from "@/modules/FoodServingSummary/FoodServingSummary";
import type { Food } from "@/api/foods.ts";
import styles from "./FoodDetailPage.module.scss";

const FoodDetailPage = () => {
  const { mealType } = useParams<{ mealType: string }>();
  const location = useLocation();
  const { logFood, isLoading, error } = useLogFood();

  if (!isMealType(mealType)) {
    return <Navigate to="/" replace />;
  }

  const { food, backTo } = (location.state as { food?: Food; backTo?: string } | null) ?? {};

  if (!food || !food.offId) {
    return <Navigate to={`/mealLog/${mealType}`} replace />;
  }

  const { correctedServingSize } = getServingDisplay(food);

  const handleAdd = (): void => {
    logFood({
      loggedDate: new Date().toISOString().slice(0, 10),
      mealType,
      name: food.name ?? "",
      offId: food.offId,
      serving: food.serving != null ? String(food.serving) : null,
      amountGrams: correctedServingSize,
      caloriesPer100g: food.caloriesPer100g,
      proteinPer100g: food.proteinPer100g,
      carbsPer100g: food.carbsPer100g,
      fatPer100g: food.fatPer100g,
    });
  };

  return (
    <PageShell center={false}>
      <Header />
      <Link to={backTo ?? `/mealLog/${mealType}`} className={styles.backLink}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <h1>{food.name}</h1>
      <FoodServingSummary food={food} />
      <ul className={styles.macros}>
        <li>
          Calories per 100g:{" "}
          {food.caloriesPer100g ? `${food.caloriesPer100g} kcal` : "?"}
        </li>
        <li>Serving size: {food.serving ?? "100g"}</li>
        <li>Protein: {food.proteinPer100g ?? "?"} g</li>
        <li>Carbs: {food.carbsPer100g ?? "?"} g</li>
        <li>Fat: {food.fatPer100g ?? "?"} g</li>
      </ul>
      {error && <p className={styles.errorText}>{error}</p>}
      <button
        type="button"
        className={styles.addButton}
        onClick={handleAdd}
        disabled={isLoading}
      >
        Add to {MEAL_TYPE_LABELS[mealType]} log
      </button>
    </PageShell>
  );
};

export default FoodDetailPage;

