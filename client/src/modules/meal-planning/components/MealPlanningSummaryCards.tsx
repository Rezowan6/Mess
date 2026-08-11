import { InfoCard } from "@/shared/components/ui/InfoCard";

import { mealPlanningSummaryCards } from "../configs/mealPlanningSummary.config";
import type { IMealPlanningSummary } from "../types/mealPlanning.types";

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
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {mealPlanningSummaryCards.map((card) => (
        <InfoCard
          key={card.key}
          title={card.title}
          value={loading ? "..." : values[card.key]}
          icon={card.icon}
        />
      ))}
    </div>
  );
};