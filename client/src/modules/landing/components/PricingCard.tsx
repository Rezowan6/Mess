import type { IPlan } from "@/modules/plan/types/plan.types";
import { isPopularPlan } from "@/modules/plan/utils/plan.utils";
import { PricingCardAction } from "@/shared/components/ui/PricingCardAction";
import { PricingCardFeatures } from "@/shared/components/ui/PricingCardFeatures";
import { PricingCardHeader } from "@/shared/components/ui/PricingCardHeader";

interface Props {
  plan: IPlan;
}

export const PricingCard = ({ plan }: Props) => {
  const isPopular = isPopularPlan(plan);

  return (
    <div
      className={`relative rounded-2xl border bg-background p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        isPopular ? "border-info shadow-lg" : "border-accent"
      }`}
    >
      <div className="space-y-4">
        <PricingCardHeader plan={plan} />

        <PricingCardAction label="Choose Plan" isPopular={isPopular} />

        <PricingCardFeatures features={plan.features ?? []} />
      </div>
    </div>
  );
};
