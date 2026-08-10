import { usePlans } from "@/modules/plan/hooks/usePlans";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { BackButton } from "@/shared/components/ui/BackButton";
import { PlanCard } from "../components/PlanCard";

export const UpgradePlanPage = () => {
  const { data } = usePlans();
  const plans = data?.data ?? [];

  return (
    <ManagementPage
      title="Upgrade Your Plan"
      description="Choose the best plan for your mess management needs."
      footer={<BackButton />}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </ManagementPage>
  );
};
