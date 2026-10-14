import { useMonthlyCalculation } from "../hooks/useMonthlyCalculation";

import { Table } from "@/shared/components/ui/Table";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { useMonthlyCalculationColumns } from "../configs/monthlyCalculation.columns";
import { MONTHLY_CALCULATION_MESSAGES } from "../configs/monthlyCalculation.messages";
import { MonthlyCalculationInfoCard } from "./MonthlyCalculationInfoCard";
import { MonthlyCalculationPdfButton } from "./MonthlyCalculationPdfButton";
import { MonthlyCalculationSkeleton } from "./MonthlyCalculationSkeleton";
import { getLocalDate } from "@/shared/utils/date.utils";

export const MonthlyCalculationTable = () => {
  const tenantName =
    useTenantStore((state) => state.currentTenant?.tenant?.name) ?? "";

  const { data, isPending, isError, refetch } = useMonthlyCalculation();

  const calculation = data?.data;

  const members = calculation?.members ?? [];

  const periodLabel = calculation?.month ?? getLocalDate()

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

      <div className="flex justify-start">
        <MonthlyCalculationPdfButton
          tenantName={tenantName}
          periodLabel={periodLabel}
        />
      </div>
    </div>
  );
};
