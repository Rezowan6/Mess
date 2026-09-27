import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { MonthlyCalculationTable } from "../components/MonthlyCalculationTable";

import { SoldProductFormModal } from "@/modules/sold-product/components/SoldProductFormModal";
import { useSoldProduct } from "@/modules/sold-product/hooks/useSoldProduct";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { useEffect, useState } from "react";

export const MonthlyCalculationPage = () => {
  const [isSoldProductModalOpen, setIsSoldProductModalOpen] = useState(false);

  const { data: soldProductData, isPending: isSoldProductPending } =
    useSoldProduct();

  const soldProduct = soldProductData?.data;

  useEffect(() => {
    if (!isSoldProductPending && !soldProduct) {
      setIsSoldProductModalOpen(true);
    }
  }, [isSoldProductPending, soldProduct]);

  return (
    <PermissionGuard permission={PERMISSIONS.MONTHLY_CALCULATION_VIEW}>
      <ManagementPage
        title="Monthly Calculation"
        description="View monthly meal rates, expenses, deposits, and member balances."
      >
        <MonthlyCalculationTable />

        <SoldProductFormModal
          isOpen={isSoldProductModalOpen}
          onClose={() => setIsSoldProductModalOpen(false)}
        />

        <MonthlyCalculationTable />
      </ManagementPage>
    </PermissionGuard>
  );
};
