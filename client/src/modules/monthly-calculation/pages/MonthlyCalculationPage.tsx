import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { MonthlyCalculationTable } from "../components/MonthlyCalculationTable";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const MonthlyCalculationPage = () => {
  return (
    <PermissionGuard permission={PERMISSIONS.MONTHLY_CALCULATION_VIEW}>
      <ManagementPage
        title="Monthly Calculation"
        description="View monthly meal rates, expenses, deposits, and member balances."
      >
        <MonthlyCalculationTable />
      </ManagementPage>
    </PermissionGuard>
  );
};
