import { useLogout } from "../hooks/useLogout.ts";
import formStyles from "./AuthForm.module.scss";
import layoutStyles from "./Foundations.module.scss";
import styles from "./Home.module.scss";

const Home = () => {
  const { logout, error } = useLogout();

  return (
    <div className={layoutStyles.page}>
      <div className={styles.content}>
        <button
          onClick={logout}
          className={layoutStyles.button}
          type="button"
        >
          Log out
        </button>
        {error && <p className={formStyles.formError}>{error}</p>}
      </div>
    </div>
  );
};

export default Home;

