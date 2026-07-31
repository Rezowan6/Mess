import { AuthCard } from "@/modules/auth/components/AuthCard";
import { TenantForm } from "../components/TenantForm";

export const TenantPage = () => {
  return (
    <AuthCard
      title="Create Your Mess"
      subtitle="Set up your mess account and start managing everything"
    >
      <TenantForm />
    </AuthCard>
  );
};
