import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";

const EGG_HISTORY_SKELETON_COLUMNS: TableSkeletonColumn[] = [
  { key: "eggDate", title: "Date", skeleton: "h-4 w-28" },
  { key: "quantity", title: "Quantity", skeleton: "h-4 w-24" },
];

export const EggHistorySkeleton = () => {
  return <TableSkeleton columns={EGG_HISTORY_SKELETON_COLUMNS} rows={5} />;
};
