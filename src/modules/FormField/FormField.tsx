import type { InputHTMLAttributes } from "react";
import styles from "./FormField.module.scss";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

const FormField = ({ id, label, error, inputProps }: FormFieldProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input className={styles.input} id={id} {...inputProps} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default FormField;
