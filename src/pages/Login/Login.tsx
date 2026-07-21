import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin.ts";
import PageShell from "../../components/PageShell/PageShell.tsx";
import AuthCard from "../../components/AuthCard/AuthCard.tsx";
import FormField from "../../components/FormField/FormField.tsx";
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
    <PageShell>
      <AuthCard
        heading="Welcome back"
        subtext="Log in to continue your streak"
        formError={error}
        onSubmit={handleSubmit(submit)}
        isSubmitting={isSubmitting}
        submitLabel="Log in"
        submittingLabel="Logging in…"
        footerLinkTo="/signup"
        footerLinkLabel="Create an account"
      >
        <FormField
          id="email"
          label="Email"
          error={errors.email?.message}
          inputProps={{
            type: "email",
            placeholder: "you@example.com",
            ...register("email"),
          }}
        />
        <FormField
          id="password"
          label="Password"
          error={errors.password?.message}
          inputProps={{
            type: "password",
            placeholder: "••••••••",
            ...register("password"),
          }}
        />
      </AuthCard>
    </PageShell>
  );
};

export default Login;
