import { SummaryStat } from "@/shared/components/ui/SummaryStat";

import {
  getMonthlyCalculationInfoCards,
  type MonthlyCalculationData,
} from "../configs/monthlyCalculationInfoCards.config";

interface Props {
  calculation: MonthlyCalculationData;
}

export const MonthlyCalculationInfoCard = ({
  calculation,
}: Props) => {
  const infoCards = getMonthlyCalculationInfoCards(calculation);

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
      {infoCards.map((card) => (
        <SummaryStat
          key={card.key}
          label={card.label}
          amount={card.amount}
          tone={card.tone}
          prefix={card.prefix ?? "৳ "}
          decimals={card.decimals ?? 2}
          hint={card.hint}
          layout="stacked"
        />
      ))}
    </div>
  );
};