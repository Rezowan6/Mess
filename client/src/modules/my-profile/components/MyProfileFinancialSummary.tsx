import { FinancialSummary } from "@/shared/components/ui/FinancialSummary";
import { MyProfileFinancialSummaryConfig } from "../configs/myProfileFinancialSummary.config";
import type { IMealCalculationSummary } from "../types/myProfile.types";

interface Props {
  summary: IMealCalculationSummary;
}

export const MyProfileFinancialSummary = ({ summary }: Props) => {
  const items = MyProfileFinancialSummaryConfig(summary);

  return <FinancialSummary items={items} />;
};
