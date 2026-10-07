import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";

const TODAY_MEAL_ENTRY_SKELETON_COLUMNS: TableSkeletonColumn[] = [
  { key: "user", title: "Member", skeleton: "h-4 w-32" },
  { key: "breakfast", title: "Breakfast", skeleton: "h-4 w-10" },
  { key: "lunch", title: "Lunch", skeleton: "h-4 w-10" },
  { key: "dinner", title: "Dinner", skeleton: "h-4 w-10" },
  { key: "total", title: "Total", skeleton: "h-4 w-12" },
];

export const TodayMealEntryTableSkeleton = () => {
  return <TableSkeleton columns={TODAY_MEAL_ENTRY_SKELETON_COLUMNS} rows={5} />;
};
