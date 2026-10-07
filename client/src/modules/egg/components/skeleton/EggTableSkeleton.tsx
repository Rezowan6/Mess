import { DataTableSkeleton } from "@/shared/components/feedback/DataTableSkeleton";
import type { TableSkeletonColumn } from "@/shared/components/feedback/TableSkeleton";
import { useEggTablePermissions } from "../../configs/egg.columns.permission";

export const EggTableSkeleton = () => {
  const { canViewDetails } = useEggTablePermissions();

  const columns: TableSkeletonColumn[] = [
    { key: "member", title: "Member", skeleton: "h-4 w-32" },
    { key: "totalEggs", title: "Total Eggs", skeleton: "h-4 w-20" },
  ];

  if (canViewDetails) {
    columns.push({
      key: "details",
      title: "Details",
      skeleton: "h-9 w-20 rounded-theme-lg",
    });
  }

  return <DataTableSkeleton columns={columns} rows={5} />;
};
