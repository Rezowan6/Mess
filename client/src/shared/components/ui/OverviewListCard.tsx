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
  totalClassName = "text-info",
  emptyMessage = "No data found",
  duration = 3000,
}: Props) => {
  const mounted = useMountAnimation();
  return (
    <div className="overflow-hidden rounded-xl p-4 shadow-lg shadow-info/20">
      <div className="mb-5">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-60">{description}</p>
      </div>

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm opacity-60">{emptyMessage}</p>
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
                className={`flex items-center justify-between rounded-xl bg-info/10 p-3 transition-all duration-500 ease-out ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-lg p-2 ${
                      item.iconBgClassName ?? "bg-primary/10"
                    } ${item.iconClassName ?? "text-info"}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium">{item.label}</p>

                    {item.description && (
                      <p className="text-xs opacity-50">{item.description}</p>
                    )}
                  </div>
                </div>

                <span
                  className={`font-semibold tabular-nums ${
                    item.valueClassName ?? "text-info"
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

      <div className="mt-4 flex items-center justify-between border-t border-info/30 pt-4">
        <span className="font-medium">{totalLabel}</span>

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
