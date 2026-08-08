import { Badge } from "@/shared/components/ui/Badge";
import { PricingCardHeader } from "@/shared/components/ui/PricingCardHeader";
import type { IPlan } from "../types/plan.types";

interface Props {
  plan: IPlan;
}

export const PlanCard = ({ plan }: Props) => {
  return (
    <div
      className={`relative space-y-2 rounded-2xl border bg-background p-8 w-[30em] sm:w-[35em] shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        plan.isActive ? "border-info shadow-lg" : "border-accent"
      }`}
    >
      <PricingCardHeader plan={plan} />

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <span className="text-sm opacity-70">Slug</span>
          <span className="font-medium">{plan.slug}</span>
        </div>

        <div className="flex items-center justify-between border-b pb-3">
          <span className="text-sm opacity-70">Monthly Price</span>
          <span className="font-semibold">
            {plan.currency} {plan.monthlyPrice}
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-3">
          <span className="text-sm opacity-70">Yearly Price</span>
          <span className="font-semibold">
            {plan.currency} {plan.yearlyPrice}
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-3">
          <span className="text-sm opacity-70">Duration</span>
          <span className="font-medium">{plan.durationDays} Days</span>
        </div>

        <div className="flex items-center justify-between border-b pb-3">
          <span className="text-sm opacity-70">Maximum Members</span>
          <span className="font-medium">
            {plan.maxMembers === -1 ? "Unlimited" : plan.maxMembers}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm opacity-70">Status</span>

          <Badge variant={plan.isActive ? "success" : "error"} size="sm">
            {plan.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="mb-1 text-sm font-medium">Description</p>

        <p className="text-sm opacity-70">
          {plan.description || "No description available."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm">
        <div>
          <p className="opacity-60">Created At</p>
          <p className="font-medium">
            {new Date(plan.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="opacity-60">Updated At</p>
          <p className="font-medium">
            {new Date(plan.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
