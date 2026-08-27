import { usePlans } from "@/modules/plan/hooks/usePlans";
import { PricingCard } from "./PricingCard";

export const PricingCards = () => {
  const { data, isLoading } = usePlans();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const plans = data?.data ?? [];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {plans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};
