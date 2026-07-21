import type { ReactNode } from "react";
import styles from "./PageShell.module.scss";

interface PageShellProps {
  children: ReactNode;
}

const PageShell = ({ children }: PageShellProps) => {
  return <div className={styles.page}>{children}</div>;
};

export default PageShell;
