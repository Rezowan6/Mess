import { AuthCard } from "../components/AuthCard";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <AuthCard subtitle="Create your account">
      <RegisterForm />
    </AuthCard>
  );
};
