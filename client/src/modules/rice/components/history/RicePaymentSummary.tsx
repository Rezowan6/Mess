import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";

import type { IRiceWithSummary } from "../../types/rice.types";

interface Props {
  rice: IRiceWithSummary;
  hasDue: boolean;
}

export const RicePaymentSummary = ({ rice, hasDue }: Props) => {
  const ITEMS = [
    { label: "Total", value: rice.totalAmount },
    { label: "Paid", value: rice.totalPaid, color: "text-theme-success" },
    {
      label: "Remaining",
      value: rice.remainingDue,
      color: hasDue ? "text-theme-danger" : "",
    },
  ];
  
  return (
    <div className="grid grid-cols-3 gap-3">
      {ITEMS.map(({ label, value, color }) => (
        <div
          key={label}
          className="p-3 border border-theme-border rounded-theme-sm"
        >
          <p className="text-xs text-theme-text-muted">{label}</p>

          <p className={`text-lg font-bold ${color}`}>
            <AnimatedNumber value={Number(value)} prefix="৳ " duration={1000} />
          </p>
        </div>
      ))}
    </div>
  );
};
