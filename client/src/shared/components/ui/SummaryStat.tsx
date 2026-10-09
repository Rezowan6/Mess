import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";
import { toTitleCase } from "@/shared/utils/format.utils";
import { AnimatedNumber } from "./AnimatedNumber";

export type SummaryStatTone =
  "info" | "success" | "accent" | "secondary" | "error" | "warning";

// Full class names, so Tailwind can detect them (dynamic names would be purged)
const toneStyles = {
  info: { value: "text-theme-info", dot: "bg-theme-info" },
  success: { value: "text-theme-success", dot: "bg-theme-success" },
  accent: { value: "text-theme-accent", dot: "bg-theme-accent" },
  secondary: { value: "text-theme-brand", dot: "bg-theme-brand" },
  error: { value: "text-theme-danger", dot: "bg-theme-danger" },
  warning: { value: "text-theme-warning", dot: "bg-theme-warning" },
} as const satisfies Record<SummaryStatTone, { value: string; dot: string }>;

// Shared card style: change it here and both layouts update
export const neuCardClass = cn(
  "rounded-theme-sm border border-theme-border-subtle bg-theme-neu-surface",
  "shadow-theme-neu transition-shadow duration-300 ease-out",
  "hover:shadow-theme-neu-inset",
);

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
          "flex min-w-0 flex-col justify-center gap-1 px-4 py-3",
          neuCardClass,
          className,
        )}
      >
        <span className="truncate text-[12px] font-medium tracking-wide text-theme-text-muted sm:text-xs">
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

        {hint && (
          <span className="truncate text-xs text-theme-text-muted">{hint}</span>
        )}

        {action}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5",
        neuCardClass,
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-x-2">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn("size-2 shrink-0 rounded-full", styles.dot)}
          />

          <span className="text-xs font-medium tracking-wide text-theme-text-muted">
            {toTitleCase(label)}
          </span>
        </div>

        <span className={cn("text-lg font-bold tabular-nums", styles.value)}>
          {value}
        </span>

        {hint && <span className="text-xs text-theme-text-muted">{hint}</span>}
      </div>

      {action}
    </div>
  );
};
