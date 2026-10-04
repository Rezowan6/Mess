import { SummaryStat } from "@/shared/components/ui/SummaryStat";

import { mealPlanningSummaryCards } from "../configs/mealPlanningSummary.config";
import type { IMealPlanningSummary } from "../types/mealPlanning.types";
import { getDecimals } from "@/shared/utils/number.utils";

interface Props {
  summary?: IMealPlanningSummary;
  loading?: boolean;
}

export const MealPlanningSummaryCards = ({
  summary,
  loading = false,
}: Props) => {
  const values = summary ?? {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    guestMeal: 0,
    totalMeals: 0,
  };

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {mealPlanningSummaryCards.map((card) => {
        // While loading the number starts at 0, then counts up when data arrives
        const amount = loading ? 0 : Number(values[card.key]);

        return (
          <SummaryStat
            key={card.key}
            label={card.title}
            amount={amount}
            prefix=""
            decimals={getDecimals(amount)}
            tone={card.tone}
            duration={800}
          />
        );
      })}
    </div>
  );
};
