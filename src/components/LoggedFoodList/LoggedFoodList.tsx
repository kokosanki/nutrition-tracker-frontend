import { useState } from "react";
import type { LoggedFood } from "@/api/mealLogs.ts";
import { getLoggedFoodCalories, getServingUnit } from "@/utils/food.ts";
import FoodListItem from "@/modules/FoodListItem/FoodListItem";
import listStyles from "@/modules/FoodListItem/FoodListItem.module.scss";
import Modal from "@/modules/Modal/Modal";
import EditLoggedFoodForm from "@/modules/EditLoggedFoodForm/EditLoggedFoodForm";
import type { EditLoggedFoodFormValues } from "@/modules/EditLoggedFoodForm/EditLoggedFoodForm.schema.ts";
import { useDeleteLoggedFood } from "@/hooks/useDeleteLoggedFood.ts";
import { useUpdateLoggedFood } from "@/hooks/useUpdateLoggedFood.ts";
import styles from "./LoggedFoodList.module.scss";

interface LoggedFoodListProps {
  items: LoggedFood[];
}

const LoggedFoodList = ({ items }: LoggedFoodListProps) => {
  const { deleteLoggedFood } = useDeleteLoggedFood();
  const { updateLoggedFood, isLoading: isSaving, error: saveError } = useUpdateLoggedFood();
  const [editingItem, setEditingItem] = useState<LoggedFood | null>(null);

  const handleSave = (values: EditLoggedFoodFormValues): void => {
    if (!editingItem) return;
    updateLoggedFood(
      { id: editingItem.id, payload: values },
      { onSuccess: () => setEditingItem(null) },
    );
  };

  if (items.length === 0) {
    return <p className={styles.empty}>No items logged yet.</p>;
  }

  return (
    <>
      <ul className={listStyles.list}>
        {items.map((item) => (
          <FoodListItem
            key={item.id}
            name={item.name}
            details={`${getLoggedFoodCalories(item) ?? "?"} kcal · ${item.amount}${getServingUnit(item.serving)}`}
            onEdit={() => setEditingItem(item)}
            onDelete={() => deleteLoggedFood(item.id)}
          />
        ))}
      </ul>
      {editingItem && (
        <Modal title={`Edit ${editingItem.name}`} onClose={() => setEditingItem(null)}>
          <EditLoggedFoodForm
            item={editingItem}
            isSubmitting={isSaving}
            error={saveError}
            onSubmit={handleSave}
            onCancel={() => setEditingItem(null)}
          />
        </Modal>
      )}
    </>
  );
};

export default LoggedFoodList;

