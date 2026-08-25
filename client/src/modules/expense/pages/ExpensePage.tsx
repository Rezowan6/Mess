import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AddExpenseModal } from "../components/AddExpenseModal";
import { getExpensePageConfig } from "../configs/expense.page.config";

import { AddPartyExpenseModal } from "@/modules/party-expense/components/AddPartyExpenseModal";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { ExpenseTabs } from "../components/ExpenseTabs";

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
      <ExpenseTabs />
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={
          <Button
            variant="moduleBtn"
            onClick={currentPage.onAction}
            permission={PERMISSIONS.EXPENSE_CREATE}
          >
            {currentPage.actionText}
          </Button>
        }
        footer={currentPage.footer}
      >
        <Outlet />
      </ManagementPage>
      <AddExpenseModal
        isOpen={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
      />
      <AddPartyExpenseModal
        isOpen={isPartyExpenseOpen}
        onClose={() => setIsPartyExpenseOpen(false)}
      />
    </PermissionGuard>
  );
};
