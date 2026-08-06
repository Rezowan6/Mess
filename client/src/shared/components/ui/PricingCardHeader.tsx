import type { plans } from "@/modules/landing/configs/plans.config";
import { Badge } from "@/shared/components/ui/Badge";

type Plan = (typeof plans)[number];

interface Props {
  plan: Plan;
}

export const PricingCardHeader = ({ plan }: Props) => {
  return (
    <>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="success">Most Popular</Badge>
        </div>
      )}

      <h3 className="text-2xl font-bold">{plan.name}</h3>

      <p className="text-base-content/70">{plan.description}</p>

      <div>
        <span className="text-4xl font-bold">৳{plan.monthlyPrice}</span>

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
