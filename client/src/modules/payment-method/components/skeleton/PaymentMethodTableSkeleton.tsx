import { DataTableSkeleton } from "@/shared/components/feedback/DataTableSkeleton";
import type { TableSkeletonColumn } from "@/shared/components/feedback/TableSkeleton";

export const PaymentMethodTableSkeleton = () => {
  const columns: TableSkeletonColumn[] = [
    { key: "provider", title: "Provider", skeleton: "h-4 w-20" },
    { key: "accountName", title: "Account Name", skeleton: "h-4 w-32" },
    {
      key: "accountNumber",
      title: "Account Number",
      skeleton: "h-4 w-28",
    },
    { key: "default", title: "Default", skeleton: "h-7 w-16 rounded-full" },
    { key: "status", title: "Status", skeleton: "h-7 w-20 rounded-full" },
  ];

  return <DataTableSkeleton columns={columns} rows={5} />;
};
