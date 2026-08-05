import PageShell from "@/modules/PageShell/PageShell";
import DailyLog from "@/components/DailyLog/DailyLog";
import Header from "@/modules/Header/Header";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <PageShell center={false} className={styles.homeShell}>
      <Header />
      <DailyLog />
    </PageShell>
  );
};

export default Home;

