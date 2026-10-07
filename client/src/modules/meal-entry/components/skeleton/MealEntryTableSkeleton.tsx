import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";
import { useMealEntryTablePermissions } from "../../configs/mealEntry.columns.permission";

export const MealEntryTableSkeleton = () => {
  const { canViewDetails } = useMealEntryTablePermissions();

  const columns: TableSkeletonColumn[] = [
    { key: "member", title: "Member", skeleton: "h-4 w-32" },
    { key: "breakfast", title: "Breakfast", skeleton: "h-4 w-16" },
    { key: "lunch", title: "Lunch", skeleton: "h-4 w-16" },
    { key: "dinner", title: "Dinner", skeleton: "h-4 w-16" },
    { key: "totalMeals", title: "Total Meals", skeleton: "h-4 w-20" },
  ];

  if (canViewDetails) {
    columns.push({
      key: "details",
      title: "Details",
      skeleton: "h-9 w-20 rounded-theme-lg",
    });
  }

  return <TableSkeleton columns={columns} rows={5} />;
};
