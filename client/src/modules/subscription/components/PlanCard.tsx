import type { IPlan } from "@/modules/plan/types/plan.types";
import { PricingCardAction } from "@/shared/components/ui/PricingCardAction";
import { PricingCardFeatures } from "@/shared/components/ui/PricingCardFeatures";
import { PricingCardHeader } from "@/shared/components/ui/PricingCardHeader";

interface Props {
  plan: IPlan;
}

export const PlanCard = ({ plan }: Props) => {
  return (
    <div
      className={`relative rounded-2xl border bg-background p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        plan.name === "Standard" ? "border-info shadow-lg" : "border-accent"
      }`}
    >
      <div className="space-y-3">
        <PricingCardHeader plan={plan} />

        <PricingCardAction
          label="Choose Plan"
          isPopular={plan.name === "Standard"}
        />

        <PricingCardFeatures features={plan.features ?? []} />
      </div>
    </div>
  );
};