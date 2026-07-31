import { AuthCard } from "../components/AuthCard";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <AuthCard title="Create Your Account" subtitle="Join the Mess Management System">
      <RegisterForm />
    </AuthCard>
  );
};
