import type { LucideIcon } from "lucide-react";

import { useMountAnimation } from "@/shared/hooks/useMountAnimation";
import { AnimatedNumber } from "./AnimatedNumber";
import { SummaryStat, neuCardClass } from "./SummaryStat";

interface OverviewListItem {
  id: string | number;
  label: string;
  value?: string | number;
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
  totalValue?: string | number;
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
  totalDecimals,
  totalClassName = "text-theme-info",
  emptyMessage = "No data found",
  duration = 1500,
}: Props) => {
  const mounted = useMountAnimation();

  return (
    <div className={`overflow-hidden p-4`}>
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
                className={`${neuCardClass} flex items-center justify-between p-3 transition-all duration-500 ease-out ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                <div className={`flex items-center gap-3`}>
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

      <div className="mt-4 border-t border-theme-border pt-4">
        {totalAmount !== undefined ? (
          <SummaryStat
            label={totalLabel}
            amount={totalAmount}
            prefix={totalPrefix}
            tone="info"
            decimals={totalDecimals}
            duration={duration}
            layout="inline"
            className={totalClassName}
          />
        ) : (
          <div className="flex items-center justify-between">
            <span className="font-medium text-theme-text-muted">
              {totalLabel}
            </span>
            <span
              className={`text-lg font-bold tabular-nums ${totalClassName}`}
            >
              {totalValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
