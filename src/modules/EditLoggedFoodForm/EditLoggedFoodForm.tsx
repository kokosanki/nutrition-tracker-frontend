import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "@/modules/FormField/FormField";
import fieldStyles from "@/modules/FormField/FormField.module.scss";
import { MEAL_TYPES, MEAL_TYPE_LABELS } from "@/constants/mealTypes.ts";
import type { LoggedFood } from "@/api/mealLogs.ts";
import {
  editLoggedFoodSchema,
  type EditLoggedFoodFormInput,
  type EditLoggedFoodFormValues,
} from "./EditLoggedFoodForm.schema.ts";
import styles from "./EditLoggedFoodForm.module.scss";

interface EditLoggedFoodFormProps {
  item: LoggedFood;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (values: EditLoggedFoodFormValues) => void;
  onCancel: () => void;
}

const EditLoggedFoodForm = ({
  item,
  isSubmitting,
  error,
  onSubmit,
  onCancel,
}: EditLoggedFoodFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditLoggedFoodFormInput, unknown, EditLoggedFoodFormValues>({
    resolver: zodResolver(editLoggedFoodSchema),
    defaultValues: {
      amount: item.amount,
      mealType: item.mealType,
      loggedDate: item.loggedDate,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        id="edit-amount"
        label="Amount"
        error={errors.amount?.message}
        inputProps={{ type: "number", step: "any", min: 0, ...register("amount") }}
      />
      <div className={fieldStyles.field}>
        <label className={fieldStyles.label} htmlFor="edit-mealType">
          Meal
        </label>
        <select id="edit-mealType" className={fieldStyles.input} {...register("mealType")}>
          {MEAL_TYPES.map((mealType) => (
            <option key={mealType} value={mealType}>
              {MEAL_TYPE_LABELS[mealType]}
            </option>
          ))}
        </select>
        {errors.mealType && <span className={fieldStyles.error}>{errors.mealType.message}</span>}
      </div>
      <FormField
        id="edit-loggedDate"
        label="Date"
        error={errors.loggedDate?.message}
        inputProps={{ type: "date", ...register("loggedDate") }}
      />
      {error && <p className={fieldStyles.error}>{error}</p>}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button type="submit" className={styles.saveButton} disabled={isSubmitting}>
          Save
        </button>
      </div>
    </form>
  );
};

export default EditLoggedFoodForm;
