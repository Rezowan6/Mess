import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AddExpenseModal } from "../components/AddExpenseModal";
import { getExpensePageConfig } from "../configs/expense.page.config";

import { AddEggModal } from "@/modules/egg/components/AddEggModal";
import { AddPartyExpenseModal } from "@/modules/party-expense/components/modla/AddPartyExpenseModal";
import { AddRiceModal } from "@/modules/rice/components/AddRiceModal";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { ExpenseRouteTabs } from "../components/ExpenseRouteTabs";

export const ExpensePage = () => {
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isPartyExpenseOpen, setIsPartyExpenseOpen] = useState(false);
  const [isEggExpenseOpen, setIsEggExpenseOpen] = useState(false);
  const [isRiceExpenseOpen, setIsRiceExpenseOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsExpenseOpen(false);
    setIsPartyExpenseOpen(false);
    setIsEggExpenseOpen(false);
    setIsRiceExpenseOpen(false);
  }, [location.pathname]);

  const currentPage = getExpensePageConfig({
    pathname: location.pathname,
    onAddExpense: () => setIsExpenseOpen(true),
    onAddPartyExpense: () => setIsPartyExpenseOpen(true),
    onAddEggExpense: () => setIsEggExpenseOpen(true),
    onAddRiceExpense: () => setIsRiceExpenseOpen(true),
  });

  return (
    <PermissionGuard permission={PERMISSIONS.EXPENSE_VIEW}>
      <ExpenseRouteTabs />
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={
          <AddButton
            label={currentPage.actionText}
            onClick={currentPage.onAction}
            permission={PERMISSIONS.EXPENSE_CREATE}
          />
        }
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

      <AddEggModal
        isOpen={isEggExpenseOpen}
        onClose={() => setIsEggExpenseOpen(false)}
      />

      <AddRiceModal
        isOpen={isRiceExpenseOpen}
        onClose={() => setIsRiceExpenseOpen(false)}
      />
    </PermissionGuard>
  );
};
