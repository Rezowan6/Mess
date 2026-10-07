import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";

const MY_MEAL_HISTORY_SKELETON_COLUMNS: TableSkeletonColumn[] = [
  { key: "date", title: "Date", skeleton: "h-4 w-28" },
  { key: "breakfast", title: "Breakfast", skeleton: "h-4 w-16" },
  { key: "lunch", title: "Lunch", skeleton: "h-4 w-16" },
  { key: "dinner", title: "Dinner", skeleton: "h-4 w-16" },
  { key: "total", title: "Total", skeleton: "h-4 w-20" },
];

export const MyMealHistorySkeleton = () => {
  return <TableSkeleton columns={MY_MEAL_HISTORY_SKELETON_COLUMNS} rows={5} />;
};
