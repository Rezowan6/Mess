import { Skeleton } from "@/shared/components/feedback/Skeleton";
import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";
import type { CSSProperties } from "react";

const SUMMARY_CELLS = [1, 2, 3, 4];

const MONTHLY_CALCULATION_SKELETON_COLUMNS: TableSkeletonColumn[] = [
  { key: "member", title: "Member", skeleton: "h-4 w-36" },
  { key: "deposit", title: "Deposit", skeleton: "h-4 w-20" },
  { key: "totalMeal", title: "Meal", skeleton: "h-4 w-12" },
  { key: "mealCost", title: "Meal Cost", skeleton: "h-4 w-20" },
  { key: "partyCost", title: "Party Cost", skeleton: "h-4 w-20" },
  { key: "eggCost", title: "Egg Cost", skeleton: "h-4 w-20" },
  { key: "totalCost", title: "Total Cost", skeleton: "h-4 w-24" },
  { key: "balance", title: "Balance", skeleton: "h-4 w-24" },
  { key: "status", title: "Status", skeleton: "h-6 w-20 rounded-full" },
];

export const MonthlyCalculationSkeleton = () => {
  return (
    <div aria-busy="true" className="space-y-6">
      {/* Summary (same structure as FinancialSummary) */}
      <div className="overflow-hidden rounded-theme-md shadow-theme-sm">
        <div
          style={{ "--cols": SUMMARY_CELLS.length } as CSSProperties}
          className="-mb-px -mr-px flex overflow-hidden p-2 lg:grid lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
        >
          {SUMMARY_CELLS.map((item) => (
            <div key={item} className="w-1/2 min-w-0 shrink-0 lg:w-auto">
              <div className="relative h-full overflow-hidden border-r border-theme-border px-3 py-3 sm:px-4">
                {/* Title: dot + label */}
                <div className="flex items-center gap-1.5">
                  <Skeleton className="size-1.5 shrink-0 rounded-full" />
                  <Skeleton className="h-3.5 w-20" />
                </div>

                {/* Value */}
                <Skeleton className="mt-1 h-5 w-24" />
                <Skeleton className="mt-1 h-2 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Page dots (small screens only) */}
        <div className="flex justify-center gap-1.5 py-2 lg:hidden">
          <Skeleton className="h-1.5 w-5 rounded-full" />
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
        </div>
      </div>

      {/* Table */}
      <TableSkeleton columns={MONTHLY_CALCULATION_SKELETON_COLUMNS} rows={5} />
    </div>
  );
};
