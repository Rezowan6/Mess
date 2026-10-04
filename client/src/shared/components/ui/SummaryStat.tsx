import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";
import { toTitleCase } from "@/shared/utils/format.utils";
import { AnimatedNumber } from "./AnimatedNumber";

type SummaryStatTone = "info" | "success" | "accent" | "secondary" | "error" | "warning";

// Full class names, so Tailwind can detect them (dynamic names would be purged)
const toneStyles = {
  info: { box: "bg-info/10", value: "text-info" },
  success: { box: "bg-success/10", value: "text-success" },
  accent: { box: "bg-accent/10", value: "text-accent" },
  secondary: { box: "bg-secondary/10", value: "text-secondary" },
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
  /** "inline": label and amount side by side. "stacked": label on top, amount below */
  layout?: "inline" | "stacked";
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
  layout = "inline",
  hint,
  action,
  className,
}: SummaryStatProps) => {
  const styles = toneStyles[tone];

  const value = (
    <AnimatedNumber
      value={amount}
      prefix={prefix}
      decimals={decimals}
      duration={duration}
    />
  );

  if (layout === "stacked") {
    return (
      <div
        className={cn(
          "flex min-w-0 flex-col justify-center gap-1 rounded-xl px-4 py-3",
          styles.box,
          className,
        )}
      >
        <span className="truncate text-[12px] font-medium tracking-wide text-base-content/60 sm:text-xs">
          {toTitleCase(label)}
        </span>

        <span
          className={cn(
            "truncate text-lg font-bold tabular-nums sm:text-xl xl:text-2xl",
            styles.value,
          )}
        >
          {value}
        </span>

        {hint && <span className="truncate text-xs opacity-60">{hint}</span>}

        {action}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl px-4 py-2 sm:py-1",
        styles.box,
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-x-2 sm:w-auto sm:justify-start">
        <span className="text-xs font-medium tracking-wide text-base-content/60">
          {toTitleCase(label)}
        </span>

        <span className={cn("text-lg font-bold tabular-nums", styles.value)}>
          {value}
        </span>

        {hint && <span className="text-xs opacity-60">{hint}</span>}
      </div>

      {action}
    </div>
  );
};
