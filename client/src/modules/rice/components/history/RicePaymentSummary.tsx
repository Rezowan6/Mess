import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";

import type { IRiceWithSummary } from "../../types/rice.types";

interface Props {
  rice: IRiceWithSummary;
  hasDue: boolean;
}

export const RicePaymentSummary = ({ rice, hasDue }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="p-3">
        <p className="text-xs opacity-60">Total</p>

        <p className="text-lg font-bold">
          <AnimatedNumber
            value={Number(rice.totalAmount)}
            prefix="৳ "
            duration={1000}
          />
        </p>
      </div>

      <div className="p-3">
        <p className="text-xs opacity-60">Paid</p>

        <p className="text-lg font-bold text-success">
          <AnimatedNumber
            value={Number(rice.totalPaid)}
            prefix="৳ "
            duration={1000}
          />
        </p>
      </div>

      <div className="p-3">
        <p className="text-xs opacity-60">Remaining</p>

        <p className={`text-lg font-bold ${hasDue ? "text-error" : ""}`}>
          <AnimatedNumber
            value={Number(rice.remainingDue)}
            prefix="৳ "
            duration={1000}
          />
        </p>
      </div>
    </div>
  );
};