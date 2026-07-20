import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.ts";
import formStyles from "./AuthForm.module.scss";
import layoutStyles from "./Foundations.module.scss";
import { loginSchema, type LoginFormValues } from "./Login.schema.ts";

const Login = () => {
  const { submit, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className={layoutStyles.page}>
      <form
        className={formStyles.card}
        onSubmit={handleSubmit(submit)}
        noValidate
      >
        <div className={formStyles.badge}>
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

        <h1 className={formStyles.heading}>Welcome back</h1>
        <p className={formStyles.subtext}>Log in to continue your streak</p>

        {error && <p className={formStyles.formError}>{error}</p>}

        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="email">
            Email
          </label>
          <input
            className={formStyles.input}
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <span className={formStyles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="password">
            Password
          </label>
          <input
            className={formStyles.input}
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <span className={formStyles.error}>{errors.password.message}</span>
          )}
        </div>

        <button
          className={formStyles.submit}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in…" : "Log in"}
        </button>

        <div className={formStyles.footer}>
          <Link className={formStyles.link} to="/signup">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

