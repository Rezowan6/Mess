import { InfoCard } from "@/shared/components/ui/InfoCard";

import { getTodayMealEntryInfoCards } from "../configs/todayMealEntryInfoCards";

interface Props {
  memberCount: number;
  summary: {
    breakfast: number;
    lunch: number;
    dinner: number;
    guest: number;
    totalMeal: number,
  };
}

export const TodayMealEntryInfoCard = ({ memberCount, summary }: Props) => {

  const infoCards = getTodayMealEntryInfoCards(memberCount, summary);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {infoCards.map((card) => (
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
