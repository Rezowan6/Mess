import {
  Children,
  isValidElement,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useMountAnimation } from "@/shared/hooks/useMountAnimation";
import { toTitleCase } from "@/shared/utils/format.utils";
import { AnimatedNumber } from "./AnimatedNumber";
import type { SummaryStatTone } from "./SummaryStat";

import { useAutoSlider } from "@/shared/hooks/useAutoSlider";

// "| undefined" lets you pass optional values straight from a config object
export interface FinancialSummaryCellProps {
  label: string;
  /** Static value. Used when `amount` is not provided. */
  value?: string | number | undefined;
  /** Numeric value. When provided, it is animated with a count-up. */
  amount?: number | undefined;
  prefix?: string | undefined;
  suffix?: string | undefined;
  decimals?: number | undefined;
  tone?: SummaryStatTone | undefined;
  duration?: number | undefined;
  action?: ReactNode;
  /** Small text under the value */
  hint?: ReactNode;
  /** Text color class, e.g. "text-success". Overrides `tone` */
  className?: string | undefined;
}

// Handy type for config files
export type FinancialSummaryItem = FinancialSummaryCellProps & { key: string };

interface FinancialSummaryProps {
  /** FinancialSummaryCell elements. Map them outside, do not wrap them in a Fragment. */
  children: ReactNode;
  /** Columns on large screens. Defaults to the number of cells (max 5). */
  columns?: number;
  /** Slide automatically on small screens. Defaults to true. */
  autoSlide?: boolean;
  /** Time between slides in ms. Defaults to 3500. */
  slideInterval?: number;
}

const MAX_DESKTOP_COLUMNS = 5;

const toneStyles = {
  info: "text-info",
  success: "text-success",
  accent: "text-accent",
  secondary: "text-secondary",
  error: "text-error",
  warning: "text-warning",
} as const satisfies Record<SummaryStatTone, string>;

export const FinancialSummary = ({
  children,
  columns,
  autoSlide = true,
  slideInterval = 3500,
}: FinancialSummaryProps) => {
  const mounted = useMountAnimation();

  const { ref, pages, activePage, goToPage, handlers } = useAutoSlider({
    enabled: autoSlide,
    interval: slideInterval,
  });

  const cells = Children.toArray(children);

  if (cells.length === 0) {
    return null;
  }

  const desktopColumns = columns ?? Math.min(cells.length, MAX_DESKTOP_COLUMNS);

  return (
    <div className="overflow-hidden rounded-xl shadow-lg shadow-info/20 p-4 bg-info/5">
      {/* Small screens: horizontal slider, 2 cards per page. Large screens: grid. */}
      <div
        ref={ref}
        {...handlers}
        style={{ "--cols": desktopColumns } as CSSProperties}
        className="-mb-px -mr-px flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none lg:grid lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {cells.map((cell, index) => (
          <div
            key={isValidElement(cell) ? (cell.key ?? index) : index}
            style={{ transitionDelay: `${index * 60}ms` }}
            className={`w-1/2 min-w-0 shrink-0 snap-start transition-all duration-500 ease-out lg:w-auto ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {cell}
          </div>
        ))}
      </div>

      {/* Page dots (small screens only) */}
      {pages > 1 && (
        <div className="flex justify-center lg:hidden">
          {Array.from({ length: pages }, (_, page) => (
            <button
              key={page}
              type="button"
              aria-label={`Go to slide ${page + 1}`}
              aria-current={page === activePage}
              onClick={() => goToPage(page)}
              className="cursor-pointer p-1.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  page === activePage
                    ? "w-5 bg-info"
                    : "w-1.5 bg-base-content/20"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const FinancialSummaryCell = ({
  label,
  value,
  amount,
  prefix,
  suffix,
  decimals,
  tone,
  duration = 1200,
  action,
  hint,
  className,
}: FinancialSummaryCellProps) => {
  return (
    <div
      className={`group relative h-full overflow-hidden border-r px-3 py-3 hover:z-10 sm:px-4 ${
        className ?? toneStyles[tone ?? "info"]
      }`}
    >
      {/* Top gradient line */}
      <span className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-current via-current/40 to-transparent" />

      {/* Hover gradient wash */}
      <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-current/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Title */}
      <div className="relative flex items-center justify-between gap-2">
        <p className="flex min-w-0 items-center gap-1.5 text-[12px] font-medium tracking-wider text-base-content/55 sm:text-sm">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-br from-current to-current/40 transition-transform duration-300 group-hover:scale-150" />
          <span className="truncate">{toTitleCase(label)}</span>
        </p>

        {action}
      </div>

      {/* Value */}
      <p className="relative mt-1 truncate text-lg font-bold tabular-nums tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 sm:text-xl">
        {amount !== undefined ? (
          <AnimatedNumber
            value={amount}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            duration={duration}
          />
        ) : (
          value
        )}
      </p>

      {/* Hint */}
      {hint && (
        <p className="relative mt-0.5 truncate text-[11px] text-base-content/45">
          {hint}
        </p>
      )}
    </div>
  );
};
