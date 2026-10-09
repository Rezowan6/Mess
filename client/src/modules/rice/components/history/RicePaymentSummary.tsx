import { SummaryStat } from "@/shared/components/ui/SummaryStat";

import type { IRiceWithSummary } from "../../types/rice.types";

interface Props {
  rice: IRiceWithSummary;
  hasDue: boolean;
}

export const RicePaymentSummary = ({ rice, hasDue }: Props) => {
  const ITEMS = [
    { label: "Total", amount: Number(rice.totalAmount), tone: "info" },
    { label: "Paid", amount: Number(rice.totalPaid), tone: "success" },
    {
      label: "Remaining",
      amount: Number(rice.remainingDue),
      tone: hasDue ? "error" : "success",
    },
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-3">
      {ITEMS.map(({ label, amount, tone }) => (
        <SummaryStat
          key={label}
          label={label}
          amount={amount}
          tone={tone}
          prefix="৳ "
          duration={1000}
          layout="stacked"
        />
      ))}
    </div>
  );
};
