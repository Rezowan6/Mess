import { DataTableSkeleton } from "@/shared/components/feedback/DataTableSkeleton";
import type { TableSkeletonColumn } from "@/shared/components/feedback/TableSkeleton";
import { usePartyExpenseTablePermissions } from "../../configs/partyExpense.columns.permission";

export const PartyExpenseTableSkeleton = () => {
  const { canViewActions } = usePartyExpenseTablePermissions();

  const columns: TableSkeletonColumn[] = [
    { key: "date", title: "Date", skeleton: "h-4 w-28" },
    { key: "amount", title: "Total Amount", skeleton: "h-4 w-20" },
    { key: "description", title: "Description", skeleton: "h-4 w-40" },
    { key: "members", title: "Members", skeleton: "h-9 w-24" },
  ];

  if (canViewActions) {
    columns.push({
      key: "actions",
      title: "Actions",
      skeleton: ["h-9 w-20 rounded-theme-lg", "h-9 w-20 rounded-theme-lg"],
    });
  }

  return <DataTableSkeleton columns={columns} rows={5} />;
};
