import { MealTrendChartContent } from "./MealTrendChartContent";
import { MealTrendHeader } from "./MealTrendHeader";
import { MealTrendSummary } from "./MealTrendSummary";

const mealTrendData = [
  { date: "01 Aug", meals: 18 },
  { date: "05 Aug", meals: 24 },
  { date: "10 Aug", meals: 21 },
  { date: "15 Aug", meals: 32 },
  { date: "20 Aug", meals: 28 },
  { date: "25 Aug", meals: 38 },
  { date: "30 Aug", meals: 35 },
];

export interface MealTrendData {
  date: string;
  meals: number;
}

export const MealTrendChart = () => {
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
