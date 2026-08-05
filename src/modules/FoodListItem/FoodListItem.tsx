import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./FoodListItem.module.scss";

interface FoodListItemProps {
  name: string;
  details: ReactNode;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const FoodListItem = ({ name, details, onClick, onEdit, onDelete }: FoodListItemProps) => {
  const content = (
    <>
      <span className={styles.name}>{name}</span>
      <span className={styles.details}>{details}</span>
    </>
  );

  return (
    <li className={styles.item}>
      {onClick ? (
        <button type="button" className={styles.itemButton} onClick={onClick}>
          {content}
        </button>
      ) : (
        <div className={styles.itemStatic}>{content}</div>
      )}
      {onEdit && (
        <button
          type="button"
          className={styles.editButton}
          onClick={onEdit}
          aria-label={`Edit ${name}`}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
          aria-label={`Delete ${name}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </li>
  );
};

export default FoodListItem;
