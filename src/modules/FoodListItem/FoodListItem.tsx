import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./FoodListItem.module.scss";

interface FoodListItemProps {
  name: string;
  details: ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
}

const FoodListItem = ({ name, details, onClick, onDelete }: FoodListItemProps) => {
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
