import type { ReactNode } from "react";
import styles from "./PageShell.module.scss";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  center?: boolean;
}

const PageShell = ({ children, className, center = true }: PageShellProps) => {
  const classes = [styles.page, center && styles.centered, className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};

export default PageShell;
