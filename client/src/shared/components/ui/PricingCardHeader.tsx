import type { IPlan } from "@/modules/plan/types/plan.types";
import { isPopularPlan } from "@/modules/plan/utils/plan.utils";
import { Badge } from "@/shared/components/ui/Badge";

interface Props {
  plan: IPlan;
}

export const PricingCardHeader = ({ plan }: Props) => {
  const isPopular = isPopularPlan(plan);

  return (
    <>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="success">Most Popular</Badge>
        </div>
      )}

      <h3 className="text-2xl font-bold">{plan.name}</h3>

      <p className="text-base-content/70">{plan.description}</p>

      <div>
        <span className="text-2xl font-bold">৳{plan.monthlyPrice}</span>
        <span className="text-base-content/60"> /month</span>
      </div>

      <p className="text-sm text-base-content/60">
        {plan.maxMembers === -1
          ? "Unlimited Members"
          : `Up to ${plan.maxMembers} Members`}
      </p>
    </>
  );
};
