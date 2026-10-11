import { DataTableSkeleton } from "@/shared/components/feedback/DataTableSkeleton";
import type { TableSkeletonColumn } from "@/shared/components/feedback/TableSkeleton";
import { useDepositTablePermissions } from "../configs/deposit.columns.permission";

export const DepositTableSkeleton = () => {
  const { canViewDetails } = useDepositTablePermissions();

  const columns: TableSkeletonColumn[] = [
    { key: "date", title: "Date", skeleton: "h-4 w-32" },
    { key: "amount", title: "Amount", skeleton: "h-4 w-20" },
    {
      key: "paymentMethod",
      title: "Payment Method",
      skeleton: "h-7 w-24 rounded-full",
    },
    { key: "note", title: "Note", skeleton: "h-4 w-40", hideOnMobile: true },
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
