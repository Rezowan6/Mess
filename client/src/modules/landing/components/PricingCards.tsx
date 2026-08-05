import { plans } from "../configs/plans.config";
import { PricingCard } from "./PricingCard";

export const PricingCards = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {plans.map((plan) => (
        <PricingCard key={plan.slug} plan={plan} />
      ))}
    </div>
  );
};
