import { AuthCard } from "../components/AuthCard";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <AuthCard subtitle="sign in to your account">
      <LoginForm />
    </AuthCard>
  );
};
