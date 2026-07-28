import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PageShell from "@/modules/PageShell/PageShell";
import Header from "@/modules/Header/Header";
import { useLogFood } from "@/hooks/useLogFood";
import { isMealType, MEAL_TYPE_LABELS } from "@/constants/mealTypes.ts";
import { getServingDisplay } from "@/utils/food.ts";
import type { Food } from "@/api/foods.ts";
import styles from "./FoodDetailPage.module.scss";

const FoodDetailPage = () => {
  const { mealType } = useParams<{ mealType: string }>();
  const location = useLocation();
  const { logFood, isLoading, error } = useLogFood();

  if (!isMealType(mealType)) {
    return <Navigate to="/" replace />;
  }

  const food = (location.state as { food?: Food } | null)?.food;

  if (!food || !food.offId) {
    return <Navigate to={`/mealLog/${mealType}`} replace />;
  }

  const { caloriesLabel, servingSize, servingSizeQuantity } = getServingDisplay(food);
  const correctedServingSize = servingSizeQuantity ?? 100;

  const handleAdd = (): void => {
    logFood({
      loggedDate: new Date().toISOString().slice(0, 10),
      mealType,
      productName: food.name ?? "",
      offId: food.offId,
      amountGrams: correctedServingSize,
      caloriesPer100g: food.caloriesPer100g ?? 0,
      proteinPer100g: food.proteinPer100g ?? undefined,
      carbsPer100g: food.carbsPer100g ?? undefined,
      fatPer100g: food.fatPer100g ?? undefined,
    });
  };

  const caloriesPerCorrectedServingSize =
    food.caloriesPer100g != null
      ? Math.round((food.caloriesPer100g * correctedServingSize) / 100)
      : null;

  return (
    <PageShell center={false}>
      <Header />
      <Link to={`/mealLog/${mealType}`} className={styles.backLink}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <h1>{food.name}</h1>
      <p className={styles.details}>
        {caloriesPerCorrectedServingSize ?? "?"} kcal {caloriesLabel} ·
        {servingSize} serving
      </p>
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

