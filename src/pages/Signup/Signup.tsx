import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignup } from "../../hooks/useSignup.ts";
import PageShell from "../../components/PageShell/PageShell.tsx";
import AuthCard from "../../components/AuthCard/AuthCard.tsx";
import FormField from "../../components/FormField/FormField.tsx";
import { signupSchema, type SignupFormValues } from "./Signup.schema.ts";

const Signup = () => {
  const { submit, error } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <PageShell>
      <AuthCard
        heading="Create account"
        subtext="Start tracking your nutrition today"
        formError={error}
        onSubmit={handleSubmit(submit)}
        isSubmitting={isSubmitting}
        submitLabel="Sign up"
        submittingLabel="Signing up…"
        footerLinkTo="/login"
        footerLinkLabel="Already have an account? Log in"
      >
        <FormField
          id="name"
          label="Name"
          error={errors.name?.message}
          inputProps={{ type: "text", ...register("name") }}
        />
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
        <FormField
          id="confirmPassword"
          label="Confirm password"
          error={errors.confirmPassword?.message}
          inputProps={{
            type: "password",
            placeholder: "••••••••",
            ...register("confirmPassword"),
          }}
        />
      </AuthCard>
    </PageShell>
  );
};

export default Signup;
