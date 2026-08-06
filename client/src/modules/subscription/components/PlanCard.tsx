import type { plans } from "@/modules/landing/configs/plans.config";
import { PricingCardAction } from "@/shared/components/ui/PricingCardAction";
import { PricingCardFeatures } from "@/shared/components/ui/PricingCardFeatures";
import { PricingCardHeader } from "@/shared/components/ui/PricingCardHeader";


export type Plan = (typeof plans)[number];

interface Props {
  plan: Plan;
}

export const PlanCard = ({ plan }: Props) => {
  return (
    <div
      className={`relative rounded-2xl border bg-background p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        plan.isPopular
          ? "border-info shadow-lg"
          : "border-accent"
      }`}
    >
      <div className="space-y-4">
        <PricingCardHeader plan={plan} />

        <PricingCardAction label="Choose Plan" isPopular={plan.isPopular} />

        <PricingCardFeatures features={plan.features} />
      </div>
    </div>
  );
};