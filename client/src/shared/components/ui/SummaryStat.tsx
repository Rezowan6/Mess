import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";
import { toTitleCase } from "@/shared/utils/format.utils";
import { AnimatedNumber } from "./AnimatedNumber";

export type SummaryStatTone =
  "info" | "success" | "accent" | "secondary" | "error" | "warning";

// Full class names, so Tailwind can detect them (dynamic names would be purged)
const toneStyles = {
  info: { box: "bg-theme-info-soft", value: "text-theme-info" },
  success: { box: "bg-theme-success-soft", value: "text-theme-success" },
  accent: { box: "bg-theme-accent-soft", value: "text-theme-accent" },
  secondary: { box: "bg-theme-brand-soft", value: "text-theme-brand" },
  error: { box: "bg-theme-danger-soft", value: "text-theme-danger" },
  warning: { box: "bg-theme-warning-soft", value: "text-theme-warning" },
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
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-theme-xl px-4 py-2",
        styles.box,
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-x-2 sm:w-auto sm:justify-start">
        <span className="text-xs font-medium tracking-wide text-theme-text-muted">
          {toTitleCase(label)}
        </span>

        <span className={cn("text-lg font-bold tabular-nums", styles.value)}>
          {value}
        </span>

        {hint && <span className="text-xs text-theme-text-muted">{hint}</span>}
      </div>

      {action}
    </div>
  );
};
