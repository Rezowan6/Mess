import { Check, Crown } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import type { IPlan } from "@/modules/plan/types/plan.types";

interface Props {
  plan: IPlan;
  selected?: boolean;
  onSelect: (plan: IPlan) => void;
}

export const SubscriptionPlanCard = ({
  plan,
  selected = false,
  onSelect,
}: Props) => {
  return (
    <div
      className={`relative rounded-2xl border p-6 transition ${
        selected
          ? "border-info shadow-lg"
          : "border-base-300 hover:border-info/50"
      }`}
    >
      {plan.name === "Standard" && (
        <div className="absolute right-4 top-4">
          <span className="badge badge-info">Popular</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Crown size={20} />
        <h3 className="text-lg font-semibold">{plan.name}</h3>
      </div>

      <div className="mt-4">
        <span className="text-3xl font-bold">৳{plan.monthlyPrice}</span>
        <span className="text-sm opacity-60">
          /{plan.durationDays}
        </span>
      </div>

      {plan.description && (
        <p className="mt-3 text-sm opacity-70">{plan.description}</p>
      )}

      {plan?.features?.length! > 0 && (
        <ul className="mt-5 space-y-2">
          {plan.features?.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check size={16} className="text-success" />
              {feature.name}
            </li>
          ))}
        </ul>
      )}

      <Button
        type="button"
        variant={selected ? "success" : "moduleBtn"}
        className="mt-6 w-full"
        onClick={() => onSelect(plan)}
      >
        {selected ? "Selected" : "Choose Plan"}
      </Button>
    </div>
  );
};