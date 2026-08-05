import { Check } from "lucide-react";

interface Props {
  features: readonly string[];
}

export const PricingCardFeatures = ({ features }: Props) => {
  return (
    <>
      <div className="divider" />

      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <Check size={18} className="text-success" />

            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
