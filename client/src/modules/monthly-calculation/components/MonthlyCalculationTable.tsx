import { Table } from "@/shared/components/ui/Table";

import { useMonthlyCalculationColumns } from "../configs/monthlyCalculation.columns";
import { MONTHLY_CALCULATION_MESSAGES } from "../configs/monthlyCalculation.messages";
import { useMonthlyCalculation } from "../hooks/useMonthlyCalculation";
import { MonthlyCalculationInfoCard } from "./MonthlyCalculationInfoCard";
import { MonthlyCalculationPdfButton } from "./MonthlyCalculationPdfButton";
import { MonthlyCalculationSkeleton } from "./MonthlyCalculationSkeleton";

export const MonthlyCalculationTable = () => {
  const { data, isPending, isError, refetch } = useMonthlyCalculation();
  const columns = useMonthlyCalculationColumns();

  const calculation = data?.data;
  const members = calculation?.members ?? [];

  if (isPending) {
    return <MonthlyCalculationSkeleton />;
  }

  return (
    <div className="mb-12 space-y-6">
      {calculation && <MonthlyCalculationInfoCard calculation={calculation} />}

      <Table
        columns={columns}
        data={members}
        error={isError}
        message={MONTHLY_CALCULATION_MESSAGES}
        refetch={refetch}
      />

      <div className="flex justify-end">
        <MonthlyCalculationPdfButton />
      </div>
    </div>
  );
};