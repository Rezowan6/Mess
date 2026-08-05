import type { plans } from "../configs/plans.config";
import { PricingCardAction } from "./PricingCardAction";
import { PricingCardFeatures } from "./PricingCardFeatures";
import { PricingCardHeader } from "./PricingCardHeader";

export type Plan = (typeof plans)[number];

export interface PricingCardProps {
  plan: Plan;
}

export const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <div
      className={`relative rounded-2xl border bg-base-100 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        plan.isPopular ? "border-primary shadow-lg" : "border-base-300"
      }`}
    >
      <div className="space-y-4">
        <PricingCardHeader plan={plan} />

        <PricingCardAction isPopular={plan.isPopular} />

        <PricingCardFeatures features={plan.features} />
      </div>
    </div>
  );
};
