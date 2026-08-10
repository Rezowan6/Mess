import { PricingCardFeatures } from "@/shared/components/ui/PricingCardFeatures";
import { PricingCardHeader } from "@/shared/components/ui/PricingCardHeader";

import type { IPlan } from "@/modules/plan/types/plan.types";
import type { ISubscription } from "../types/subscription.types";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";

interface Props {
  plan: IPlan;
  subscription: ISubscription;
}

export const CurrentPlanCard = ({ plan, subscription }: Props) => {
  return (
    <div className="rounded-2xl bg-success/10 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <PricingCardHeader plan={plan} />
        </div>

        <SubscriptionStatusBadge status={subscription.status} />
      </div>
      <PricingCardFeatures features={plan.features ?? []} />{" "}
    </div>
  );
};
