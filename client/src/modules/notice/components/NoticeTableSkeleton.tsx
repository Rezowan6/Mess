import { DataTableSkeleton } from "@/shared/components/feedback/DataTableSkeleton";
import type { TableSkeletonColumn } from "@/shared/components/feedback/TableSkeleton";

export const NoticeTableSkeleton = () => {
  const columns: TableSkeletonColumn[] = [
    { key: "title", title: "Title", skeleton: "h-4 w-32" },
    {
      key: "description",
      title: "Description",
      skeleton: "h-4 w-48",
    },
    {
      key: "mealSessionId",
      title: "Meal Session",
      skeleton: "h-7 w-28 rounded-full",
    },
    {
      key: "createdAt",
      title: "Created At",
      skeleton: "h-4 w-28",
      hideOnMobile: true,
    },
  ];

  return <DataTableSkeleton columns={columns} rows={5} />;
};
