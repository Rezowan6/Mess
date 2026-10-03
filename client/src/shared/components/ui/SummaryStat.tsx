import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";
import { AnimatedNumber } from "./AnimatedNumber";

type SummaryStatTone = "info" | "success" | "error" | "warning";

// Full class names, so Tailwind can detect them (dynamic names would be purged)
const toneStyles = {
  info: { box: "bg-info/10", value: "text-info" },
  success: { box: "bg-success/10", value: "text-success" },
  error: { box: "bg-error/10", value: "text-error" },
  warning: { box: "bg-warning/10", value: "text-warning" },
} as const satisfies Record<SummaryStatTone, { box: string; value: string }>;

interface SummaryStatProps {
  label: string;
  amount: number;
  tone?: SummaryStatTone;
  prefix?: string;
  decimals?: number;
  duration?: number;
  /** Small text after the amount, e.g. "· 3 purchases" */
  hint?: ReactNode;
  /** Anything on the right side, e.g. a button */
  action?: ReactNode;
  className?: string;
}

export const SummaryStat = ({
  label,
  amount,
  tone = "info",
  prefix = "৳ ",
  decimals,
  duration = 1200,
  hint,
  action,
  className,
}: SummaryStatProps) => {
  const styles = toneStyles[tone];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl px-4 py-2 sm:py-1",
        styles.box,
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-2">
        <span className="text-xs font-medium uppercase tracking-wide text-base-content/60">
          {label}
        </span>

        <span className={cn("text-lg font-bold tabular-nums", styles.value)}>
          <AnimatedNumber
            value={amount}
            prefix={prefix}
            decimals={decimals}
            duration={duration}
          />
        </span>

        {hint && <span className="text-xs opacity-60">{hint}</span>}
      </div>

      {action}
    </div>
  );
};
