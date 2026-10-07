import type { LucideIcon } from "lucide-react";

import { useMountAnimation } from "@/shared/hooks/useMountAnimation";
import { AnimatedNumber } from "./AnimatedNumber";

interface OverviewListItem {
  id: string | number;
  label: string;
  /** Static value. Used when `amount` is not provided. */
  value?: string | number;
  /** Numeric value. When provided, it is animated with a count-up. */
  amount?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
  iconClassName?: string;
  iconBgClassName?: string;
  valueClassName?: string;
  description?: string;
}

interface Props {
  title: string;
  description: string;
  items: OverviewListItem[];
  totalLabel: string;
  /** Static total. Used when `totalAmount` is not provided. */
  totalValue?: string | number;
  /** Numeric total. When provided, it is animated with a count-up. */
  totalAmount?: number;
  totalPrefix?: string;
  totalSuffix?: string;
  totalDecimals?: number;
  totalClassName?: string;
  emptyMessage?: string;
  duration?: number;
}

const MAX_STAGGER_STEPS = 8;

export const OverviewListCard = ({
  title,
  description,
  items,
  totalLabel,
  totalValue,
  totalAmount,
  totalPrefix,
  totalSuffix,
  totalDecimals,
  totalClassName = "text-theme-info",
  emptyMessage = "No data found",
  duration = 1500,
}: Props) => {
  const mounted = useMountAnimation();
  return (
    <div className="overflow-hidden rounded-theme-xl p-4 shadow-theme-lg">
      <div className="mb-5">
        <h3 className="font-semibold text-theme-text">{title}</h3>
        <p className="text-sm text-theme-text-muted">{description}</p>
      </div>

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-theme-text-muted">
          {emptyMessage}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                style={{
                  transitionDelay: `${Math.min(index, MAX_STAGGER_STEPS) * 60}ms`,
                }}
                className={`flex items-center justify-between rounded-theme-xl bg-theme-info-soft p-3 transition-all duration-500 ease-out ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-theme-md p-2 ${
                      item.iconBgClassName ?? "bg-theme-brand-soft"
                    } ${item.iconClassName ?? "text-theme-info"}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-theme-text">
                      {item.label}
                    </p>

                    {item.description && (
                      <p className="text-xs text-theme-text-muted">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`font-semibold tabular-nums ${
                    item.valueClassName ?? "text-theme-info"
                  }`}
                >
                  {item.amount !== undefined ? (
                    <AnimatedNumber
                      value={item.amount}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      decimals={item.decimals}
                      duration={duration}
                    />
                  ) : (
                    item.value
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-theme-border pt-4">
        <span className="font-medium text-theme-text-muted">{totalLabel}</span>

        <span className={`text-lg font-bold tabular-nums ${totalClassName}`}>
          {totalAmount !== undefined ? (
            <AnimatedNumber
              value={totalAmount}
              prefix={totalPrefix}
              suffix={totalSuffix}
              decimals={totalDecimals}
              duration={duration}
            />
          ) : (
            totalValue
          )}
        </span>
      </div>
    </div>
  );
};
