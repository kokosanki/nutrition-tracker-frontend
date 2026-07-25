import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "@/hooks/useLogout.ts";
import styles from "./Header.module.scss";

const Header = () => {
  const { logout, error } = useLogout();

  return (
    <header className={styles.header}>
      <button
        onClick={logout}
        className={styles.logoutButton}
        type="button"
        aria-label="Log out"
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
      {error && <p className={styles.errorText}>{error}</p>}
    </header>
  );
};

export default Header;
