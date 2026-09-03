import { Activity, BarChart3 } from "lucide-react";

export const MealTrendHeader = () => {
  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center animate-pulse rounded-xl bg-info/10 text-info">
            <Activity size={20} />
          </div>

          <div>
            <h3 className="text-accent font-semibold">
              Meal Trend
            </h3>
            <p className="mt-0.5 text-xs text-base-content/60">
              Daily meal consumption overview
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-info/10 px-3 py-1.5 text-xs font-medium text-info">
          <BarChart3 size={15} />
          This Month
        </div>
      </div>
    </>
  );
};
