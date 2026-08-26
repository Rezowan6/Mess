import type { LucideIcon } from "lucide-react";

export interface FinancialSummaryItem {
  key: string;
  title: string;
  value: string | number;
  icon: LucideIcon;
  className?: string;
}

interface Props {
  items: FinancialSummaryItem[];
}

export const FinancialSummary = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="rounded-2xl bg-info/10 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={`mb-3 ${item.className ?? ""}`}>
              <Icon size={22} />
            </div>

            <p className="text-sm opacity-60">{item.title}</p>

            <p className="mt-1 text-xl font-bold">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};
