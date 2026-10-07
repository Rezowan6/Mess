import { DataTableSkeleton } from "@/shared/components/feedback/DataTableSkeleton";
import type { TableSkeletonColumn } from "@/shared/components/feedback/TableSkeleton";
import { useRiceTablePermissions } from "../../configs/rice.columns.permission";

export const RiceTableSkeleton = () => {
  const { canManage } = useRiceTablePermissions();

  const columns: TableSkeletonColumn[] = [
    { key: "supplier", title: "Supplier", skeleton: "h-4 w-32" },
    { key: "quantity", title: "Quantity", skeleton: "h-4 w-20" },
    { key: "totalAmount", title: "Total", skeleton: "h-4 w-24" },
    { key: "totalPaid", title: "Paid", skeleton: "h-4 w-24" },
    { key: "remainingDue", title: "Due", skeleton: "h-4 w-24" },
    {
      key: "purchaseType",
      title: "Type",
      skeleton: "h-7 w-24 rounded-full",
    },
    {
      key: "paymentStatus",
      title: "Status",
      skeleton: "h-7 w-24 rounded-full",
    },
  ];

  if (canManage) {
    columns.push({
      key: "actions",
      title: "Actions",
      skeleton: [
        "h-8 w-14 rounded-theme-lg",
        "h-8 w-8 rounded-theme-lg",
        "h-8 w-8 rounded-theme-lg",
        "h-8 w-16 rounded-theme-lg",
      ],
    });
  }

  return <DataTableSkeleton columns={columns} rows={5} />;
};
