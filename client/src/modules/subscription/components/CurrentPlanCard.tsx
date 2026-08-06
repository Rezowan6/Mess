import { Badge } from "@/shared/components/ui/Badge";
import { PricingCardFeatures } from "@/shared/components/ui/PricingCardFeatures";
import { PricingCardHeader } from "@/shared/components/ui/PricingCardHeader";

import type { Plan } from "@/modules/landing/configs/plans.config";

interface Props {
  plan: Plan;
}

export const CurrentPlanCard = ({ plan }: Props) => {
  return (
    <div className="rounded-2xl bg-success/10 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <PricingCardHeader plan={plan} />
        </div>

        <Badge variant="success">Active</Badge>
      </div>

      <PricingCardFeatures features={plan.features} />
    </div>
  );
};
