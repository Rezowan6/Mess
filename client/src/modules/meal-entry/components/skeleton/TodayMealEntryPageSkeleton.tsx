import { TodayMealEntrySummarySkeleton } from "../TodayMealEntrySummarySkeleton";
import { TodayMealEntryTableSkeleton } from "./TodayMealEntryTableSkeleton";

export const TodayMealEntryPageSkeleton = () => {
  return (
    <div aria-busy="true" className="space-y-6">
      <TodayMealEntrySummarySkeleton />
      <TodayMealEntryTableSkeleton />
    </div>
  );
};
