import { InfoCard } from "@/shared/components/ui/InfoCard";

import { getMonthlyMealSummaryCards } from "../configs/monthlyMealSummaryCards.config";

interface Props {
  summary: {
    breakfast: number;
    lunch: number;
    dinner: number;
    total: number;
  };
}

export const MonthlyMealSummaryCard = ({ summary }: Props) => {
  const cards = getMonthlyMealSummaryCards(summary);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <InfoCard
          key={card.key}
          icon={card.icon}
          iconClassName={card.iconClassName}
          title={card.title}
          value={card.value}
          valueClassName={card.valueClassName}
        />
      ))}
    </div>
  );
};
