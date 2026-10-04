import {
  FinancialSummary,
  FinancialSummaryCell,
} from "@/shared/components/ui/FinancialSummary";
import { MyProfileFinancialSummaryConfig } from "../configs/myProfileFinancialSummary.config";
import type { IMealCalculationSummary } from "../types/myProfile.types";

interface Props {
  summary: IMealCalculationSummary;
}

export const MyProfileFinancialSummary = ({ summary }: Props) => {
  const items = MyProfileFinancialSummaryConfig(summary);

  return (
    <FinancialSummary>
      {items.map((item) => (
        <FinancialSummaryCell
          key={item.key}
          label={item.label}
          amount={item.amount}
          tone={item.tone}
          prefix={item.prefix ?? "৳ "}
          decimals={item.decimals ?? 2}
          hint={item.hint}
          className={item.className}
        />
      ))}
    </FinancialSummary>
  );
};
