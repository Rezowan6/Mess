import { type CSSProperties } from "react";

import { useMountAnimation } from "@/shared/hooks/useMountAnimation";
import { toTitleCase } from "@/shared/utils/format.utils";
import { AnimatedNumber } from "./AnimatedNumber";

export interface FinancialSummaryItem {
  key: string;
  title: string;
  /** Static value. Used when `amount` is not provided. */
  value?: string | number;
  /** Numeric value. When provided, it is animated with a count-up. */
  amount?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Optional small text under the value */
  description?: string;
  /** Text color class, e.g. "text-success". Drives all gradients of the cell */
  className?: string;
}

interface Props {
  items: FinancialSummaryItem[];
}

const MAX_DESKTOP_COLUMNS = 5;

export const FinancialSummary = ({ items }: Props) => {
  const mounted = useMountAnimation();

  const columns = Math.min(items.length, MAX_DESKTOP_COLUMNS);

  return (
    <div className="overflow-hidden rounded-xl shadow-lg shadow-info/20">
      <div
        className="-mb-px -mr-px grid grid-cols-2 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
        style={{ "--cols": columns } as CSSProperties}
      >
        {items.map((item, index) => (
          <div
            key={item.key}
            style={{ transitionDelay: `${index * 60}ms` }}
            className={`group relative overflow-hidden border-r px-3 py-3 transition-all duration-500 ease-out hover:z-10 sm:px-4 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            } max-lg:[&:last-child:nth-child(odd)]:col-span-2 ${
              item.className ?? "text-primary"
            }`}
          >
            {/* Top gradient line */}
            <span className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-current via-current/40 to-transparent" />

            {/* Hover gradient wash */}
            <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-current/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Title */}
            <p className="relative flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-base-content/55 sm:text-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-br from-current to-current/40 transition-transform duration-300 group-hover:scale-150" />
              <span className="truncate">{toTitleCase(item.title)}</span>
            </p>

            {/* Value */}
            <p className="relative mt-1 truncate  text-lg font-bold tabular-nums tracking-tight  transition-transform duration-300 group-hover:translate-x-0.5 sm:text-xl">
              {item.amount !== undefined ? (
                <AnimatedNumber
                  value={item.amount}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  decimals={item.decimals}
                />
              ) : (
                item.value
              )}
            </p>

            {/* Description */}
            {item.description && (
              <p className="relative mt-0.5 truncate text-[11px] text-base-content/45">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
