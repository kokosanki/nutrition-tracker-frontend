import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PageShell from "@/modules/PageShell/PageShell";
import Header from "@/modules/Header/Header";
import FormField from "@/modules/FormField/FormField";
import { useLogFood } from "@/hooks/useLogFood";
import { isMealType, MEAL_TYPE_LABELS } from "@/constants/mealTypes.ts";
import { getLoggedFoodCalories, getServingDisplay } from "@/utils/food.ts";
import { getTodayDateString } from "@/utils/date.ts";
import FoodServingSummary from "@/modules/FoodServingSummary/FoodServingSummary";
import type { Food } from "@/api/foods.ts";
import {
  addToLogSchema,
  type AddToLogFormInput,
  type AddToLogFormValues,
} from "./FoodDetailPage.schema.ts";
import styles from "./FoodDetailPage.module.scss";

const SERVING_MULTIPLIERS = [
  { label: "½ serving", multiplier: 0.5 },
  { label: "1 serving", multiplier: 1 },
  { label: "2 servings", multiplier: 2 },
];

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

  const { correctedServingSize, unit } = getServingDisplay(food);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddToLogFormInput, unknown, AddToLogFormValues>({
    resolver: zodResolver(addToLogSchema),
    defaultValues: { amount: correctedServingSize },
  });

  const amount = watch("amount");
  const numericAmount = typeof amount === "number" ? amount : parseFloat(String(amount));
  const previewCalories =
    !Number.isNaN(numericAmount)
      ? getLoggedFoodCalories({ caloriesPer100g: food.caloriesPer100g, amountGrams: numericAmount })
      : null;

  const handlePickServing = (multiplier: number): void => {
    setValue("amount", multiplier * correctedServingSize, { shouldValidate: true });
  };

  const onSubmit = (data: AddToLogFormValues): void => {
    logFood({
      loggedDate: getTodayDateString(),
      mealType,
      name: food.name ?? "",
      offId: food.offId,
      serving: food.serving != null ? String(food.serving) : null,
      amountGrams: data.amount,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {food.serving != null && (
          <div className={styles.servingOptions}>
            {SERVING_MULTIPLIERS.map(({ label, multiplier }) => {
              const value = multiplier * correctedServingSize;
              const isActive = numericAmount === value;
              return (
                <button
                  key={label}
                  type="button"
                  className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
                  onClick={() => handlePickServing(multiplier)}
                >
                  {label} ({value}
                  {unit})
                </button>
              );
            })}
          </div>
        )}
        <div className={styles.amountRow}>
          <FormField
            id="amount"
            label={`Amount (${unit})`}
            error={errors.amount?.message}
            inputProps={{
              type: "number",
              step: "any",
              min: 0,
              ...register("amount"),
            }}
          />
        </div>
        {previewCalories != null && (
          <p className={styles.calorieHint}>{previewCalories} kcal</p>
        )}
        {error && <p className={styles.errorText}>{error}</p>}
        <button type="submit" className={styles.addButton} disabled={isLoading}>
          Add to {MEAL_TYPE_LABELS[mealType]} log
        </button>
      </form>
    </PageShell>
  );
};

export default FoodDetailPage;
