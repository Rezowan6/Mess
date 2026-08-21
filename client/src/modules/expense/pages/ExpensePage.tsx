import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AddExpenseModal } from "../components/AddExpenseModal";
import { getExpensePageConfig } from "../configs/expense.page.config";

import { AddPartyExpenseModal } from "@/modules/party-expense/components/AddPartyExpenseModal";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { ButtonModule } from "@/shared/components/ui/ButtonModule";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const ExpensePage = () => {
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isPartyExpenseOpen, setIsPartyExpenseOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsExpenseOpen(false);
    setIsPartyExpenseOpen(false);
  }, [location.pathname]);

  const currentPage = getExpensePageConfig({
    pathname: location.pathname,
    onAddExpense: () => setIsExpenseOpen(true),
    onAddPartyExpense: () => setIsPartyExpenseOpen(true),
  });

  return (
    <PermissionGuard permission={PERMISSIONS.EXPENSE_VIEW}>
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={
          <ButtonModule
            text={currentPage.actionText}
            onClick={currentPage.onAction}
            permission={PERMISSIONS.EXPENSE_CREATE}
          />
        }
        footer={currentPage.footer}
      >
        <Outlet />
      </ManagementPage>
      <AddExpenseModal
        isOpen={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
      />{" "}

      
      <AddPartyExpenseModal
        isOpen={isPartyExpenseOpen}
        onClose={() => setIsPartyExpenseOpen(false)}
      />
    </PermissionGuard>
  );
};
