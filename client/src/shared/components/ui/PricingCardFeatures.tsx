import { Check } from "lucide-react";

import type { IPlanFeature } from "@/modules/plan/types/plan.types";

interface Props {
  features: IPlanFeature[];
}

export const PricingCardFeatures = ({ features }: Props) => {
  const activeFeatures = features.filter(
    (feature) => feature.isActive && feature.PlanFeature?.value === "true",
  );

  return (
    <ul className="space-y-3">
      {activeFeatures.map((feature) => (
        <li key={feature.id} className="flex items-center gap-3 text-sm">
          <Check size={18} className="text-theme-success" />
          <span>{feature.name}</span>
        </li>
      ))}
    </ul>
  );
};
