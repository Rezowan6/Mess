import {
  FinancialSummary,
  FinancialSummaryCell,
} from "@/shared/components/ui/FinancialSummary";
import { getMonthlyCalculationInfoCards } from "../configs/monthlyCalculationInfoCards.config";
import type { IMonthlyCalculation } from "../types/monthlyCalculation.types";

interface Props {
  calculation: IMonthlyCalculation;
}

export const MonthlyCalculationInfoCard = ({ calculation }: Props) => {
  const infoCards = getMonthlyCalculationInfoCards(calculation);

  return (
    <FinancialSummary columns={5} slideInterval={2500}>
      {infoCards.map((card) => (
        <FinancialSummaryCell
          key={card.key}
          label={card.label}
          amount={card.amount}
          tone={card.tone}
          prefix={card.prefix ?? "৳ "}
          decimals={card.decimals ?? 2}
          hint={card.hint}
        />
      ))}
    </FinancialSummary>
  );
};
