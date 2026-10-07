import { MemberHeaderSkeleton } from "@/shared/components/feedback/MemberHeaderSkeleton";
import { TodayMealEntryTableSkeleton } from "./TodayMealEntryTableSkeleton";

export const MealEntryHistorySkeleton = () => {
  return (
    <>
      <MemberHeaderSkeleton subtitle="Meal History" rightLabel="Total Meals" />

      <TodayMealEntryTableSkeleton />
    </>
  );
};
