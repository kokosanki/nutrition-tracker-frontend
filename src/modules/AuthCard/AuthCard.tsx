import type { FormEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./AuthCard.module.scss";

interface AuthCardProps {
  heading: string;
  subtext: string;
  formError: string | null;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  footerLinkTo: string;
  footerLinkLabel: string;
  children: ReactNode;
}

const AuthCard = ({
  heading,
  subtext,
  formError,
  onSubmit,
  isSubmitting,
  submitLabel,
  submittingLabel,
  footerLinkTo,
  footerLinkLabel,
  children,
}: AuthCardProps) => {
  return (
    <form className={styles.card} onSubmit={onSubmit} noValidate>
      <div className={styles.badge}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 20A7 7 0 0 1 4 13v-1a1 1 0 0 1 1-1h1a7 7 0 0 1 7 7v2z" />
          <path d="M4 21c6-2 10-6 12-12" />
        </svg>
      </div>

      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.subtext}>{subtext}</p>

      {formError && <p className={styles.formError}>{formError}</p>}

      {children}

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? submittingLabel : submitLabel}
      </button>

      <div className={styles.footer}>
        <Link className={styles.link} to={footerLinkTo}>
          {footerLinkLabel}
        </Link>
      </div>
    </form>
  );
};

export default AuthCard;
