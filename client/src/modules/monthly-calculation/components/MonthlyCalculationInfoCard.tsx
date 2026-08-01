import { InfoCard } from "@/shared/components/ui/InfoCard";

import { getMonthlyCalculationInfoCards } from "../configs/monthlyCalculationInfoCards.config";

interface Props {
  calculation: {
    totalExpense: number;
    totalDeposit: string | number;
    grandTotalMeals: number;
    mealRate: number;
  };
}

export const MonthlyCalculationInfoCard = ({ calculation }: Props) => {
  const infoCards = getMonthlyCalculationInfoCards(calculation);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
