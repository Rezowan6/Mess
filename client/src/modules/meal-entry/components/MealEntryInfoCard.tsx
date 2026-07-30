import { InfoCard } from "@/shared/components/ui/InfoCard";
import { getMealEntryInfoCards } from "../configs/mealEntryInfoCards";

interface Props {
  memberName: string;
  totalMeals: number;
}

export const MealEntryInfoCard = ({ memberName, totalMeals }: Props) => {
  const infoCards = getMealEntryInfoCards(memberName, totalMeals);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
