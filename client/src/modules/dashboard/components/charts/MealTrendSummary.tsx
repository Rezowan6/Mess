import type { MealTrendData } from "./MealTrendChart";

interface Props {
  data: MealTrendData[];
}

export const MealTrendSummary = ({ data }: Props) => {
  const totalMeals = data.reduce((sum, item) => sum + item.meals, 0);

  const averageMeals = data.length ? Math.round(totalMeals / data.length) : 0;

  return (
    <div className="mt-4 flex items-center justify-between border-t border-base-200 pt-4">
      <div>
        <p className="text-xs text-base-content/50">Total meals</p>
        <p className="mt-1 text-lg font-bold">{totalMeals}</p>
      </div>

      <div className="text-right">
        <p className="text-xs text-base-content/50">Average / period</p>
        <p className="mt-1 text-lg font-bold">{averageMeals}</p>
      </div>
    </div>
  );
};
