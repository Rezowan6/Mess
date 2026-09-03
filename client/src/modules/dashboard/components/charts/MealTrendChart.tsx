import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { formatDate } from "@/shared/utils/date.utils";
import { useMealTrend } from "../../hooks/useMealTrend";
import { MealTrendChartContent } from "./MealTrendChartContent";
import { MealTrendChartSkeleton } from "./MealTrendChartSkeleton";
import { MealTrendHeader } from "./MealTrendHeader";
import { MealTrendSummary } from "./MealTrendSummary";

export interface MealTrendData {
  date: string;
  meals: number;
}

export const MealTrendChart = () => {
  const { data, isPending } = useMealTrend();

  if (isPending) {
    return <MealTrendChartSkeleton />;
  }

  const mealTrendData: MealTrendData[] =
    data?.data?.map((item) => ({
      date: formatDate(item.date),
      meals: Number(item.meals),
    })) ?? [];

  if (!mealTrendData.length) {
    return (
      <EmptyState
        title="No Meal Trend Data"
        description="There is no meal consumption data available for this meal session."
      />
    );
  }
  return (
    <div className="rounded-md border border-success/40 bg-background p-5 shadow-sm">
      {/* Header */}
      <MealTrendHeader />

      {/* Chart */}
      <MealTrendChartContent data={mealTrendData} />

      {/* Footer */}
      <MealTrendSummary data={mealTrendData} />
    </div>
  );
};
