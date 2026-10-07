import { FinancialSummarySkeleton } from "@/shared/components/feedback/FinancialSummarySkeleton";
import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";

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
      <FinancialSummarySkeleton cells={4} />

      {/* Table */}
      <TableSkeleton columns={MONTHLY_CALCULATION_SKELETON_COLUMNS} rows={5} />
    </div>
  );
};
