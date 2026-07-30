import type { ReactNode } from "react";
import styles from "./FoodListItem.module.scss";

interface FoodListItemProps {
  name: string;
  details: ReactNode;
  onClick?: () => void;
}

const FoodListItem = ({ name, details, onClick }: FoodListItemProps) => {
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
    </li>
  );
};

export default FoodListItem;
