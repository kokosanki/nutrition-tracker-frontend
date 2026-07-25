import { useLogout } from "@/hooks/useLogout.ts";
import PageShell from "@/modules/PageShell/PageShell.tsx";
import styles from "./Home.module.scss";

const Home = () => {
  const { logout, error } = useLogout();

  return (
    <PageShell>
      <div className={styles.content}>
        <button onClick={logout} className={styles.logoutButton} type="button">
          Log out
        </button>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    </PageShell>
  );
};

export default Home;

