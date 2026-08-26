import type { LucideIcon } from "lucide-react";

interface OverviewListItem {
  id: string | number;
  label: string;
  value: string | number;
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
  totalValue: string | number;
  totalClassName?: string;
  emptyMessage?: string;
}

export const OverviewListCard = ({
  title,
  description,
  items,
  totalLabel,
  totalValue,
  totalClassName = "text-info",
  emptyMessage = "No data found",
}: Props) => {
  return (
    <div className="rounded-2xl bg-background p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-60">{description}</p>
      </div>

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm opacity-60">{emptyMessage}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl bg-info/10 p-3"
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
                  className={`font-semibold ${
                    item.valueClassName ?? "text-info"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-info pt-4">
        <span className="font-medium">{totalLabel}</span>

        <span className={`text-lg font-bold ${totalClassName}`}>
          {totalValue}
        </span>
      </div>
    </div>
  );
};
