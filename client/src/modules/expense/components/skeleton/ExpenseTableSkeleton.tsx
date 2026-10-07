import { DataTableSkeleton } from "@/shared/components/feedback/DataTableSkeleton";
import type { TableSkeletonColumn } from "@/shared/components/feedback/TableSkeleton";
import { useExpenseTablePermissions } from "../../configs/expense.columns.permission";

export const ExpenseTableSkeleton = () => {
  const { canViewDetails } = useExpenseTablePermissions();

  const columns: TableSkeletonColumn[] = [
    { key: "signature", title: "Signature", skeleton: "h-4 w-32" },
    { key: "amount", title: "Amount", skeleton: "h-4 w-20" },
    { key: "date", title: "Date", skeleton: "h-4 w-28" },
  ];

  if (canViewDetails) {
    columns.push({
      key: "action",
      title: "Action",
      skeleton: ["h-9 w-20 rounded-theme-lg", "h-9 w-20 rounded-theme-lg"],
    });
  }

  return <DataTableSkeleton columns={columns} rows={5} />;
};
