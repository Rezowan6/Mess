import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { MonthlyCalculationTable } from "../components/MonthlyCalculationTable";

import { SoldProductFormModal } from "@/modules/sold-product/components/SoldProductFormModal";
import { useSoldProduct } from "@/modules/sold-product/hooks/useSoldProduct";
import { PageActionMenu } from "@/shared/components/navigation/PageActionMenu";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { Calendar, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MonthlyCalculationPage = () => {
  const [isSoldProductModalOpen, setIsSoldProductModalOpen] = useState(false);
  const navigate = useNavigate();

  const { can } = useRBAC();

  const { data: soldProductData, isPending: isSoldProductPending } =
    useSoldProduct();

  const soldProduct = soldProductData?.data;

  useEffect(() => {
    if (!isSoldProductPending && !soldProduct) {
      setIsSoldProductModalOpen(true);
    }
  }, [isSoldProductPending, soldProduct]);

  const menuItems = [
    {
      label: "Pending Meals ",
      icon: Calendar,
      onClick: () => {
        navigate(`${ROUTES.MEAL_REQUEST}/pending-meals`);
      },
    },

    {
      label: "Meal Settings",
      icon: Settings,
      onClick: () => {
        navigate(`${ROUTES.SETTINGS}/meal-setting`);
      },
    },
  ];

  return (
    <PermissionGuard permission={PERMISSIONS.MONTHLY_CALCULATION_VIEW}>
      <ManagementPage
        title="Monthly Calculation"
        description="View monthly meal rates, expenses, deposits, and member balances."
        action={
          can(PERMISSIONS.MEAL_ENTRY_CREATE) && (
            <PageActionMenu items={menuItems} placement="bottom-end" />
          )
        }
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
