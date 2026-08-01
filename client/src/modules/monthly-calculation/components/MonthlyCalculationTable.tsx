import { useMonthlyCalculation } from "../hooks/useMonthlyCalculation";

import { Table } from "@/shared/components/ui/Table";

import { useMonthlyCalculationColumns } from "../configs/monthlyCalculation.columns";
import { MONTHLY_CALCULATION_MESSAGES } from "../configs/monthlyCalculation.messages";
import { MonthlyCalculationInfoCard } from "./MonthlyCalculationInfoCard";
import { MonthlyCalculationSkeleton } from "./MonthlyCalculationSkeleton";

export const MonthlyCalculationTable = () => {
  const { data, isPending, isError, refetch } = useMonthlyCalculation();

  const calculation = data?.data;

  const members = calculation?.members ?? [];

  const columns = useMonthlyCalculationColumns();

  if (isPending) {
    return <MonthlyCalculationSkeleton />;
  }

  return (
    <div className="space-y-6">
      {calculation && <MonthlyCalculationInfoCard calculation={calculation} />}

      <Table
        columns={columns}
        data={members}
        loading={isPending}
        error={isError}
        message={MONTHLY_CALCULATION_MESSAGES}
        refetch={refetch}
      />
    </div>
  );
};
