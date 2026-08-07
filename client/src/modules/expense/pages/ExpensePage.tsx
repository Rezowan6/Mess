import { useState } from "react";
import { AddExpenseModal } from "../components/AddExpenseModal";

import { ExpenseTable } from "../components/ExpenseTable";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { ButtonModule } from "@/shared/components/ui/ButtonModule";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const ExpensePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PermissionGuard permission={PERMISSIONS.EXPENSE_VIEW}>
      <ManagementPage
        title="Expense Management"
        description="Manage mess expenses and records"
        action={
          <ButtonModule text="Add Expense" onClick={() => setIsOpen(true)} />
        }
      >
        <ExpenseTable />
      </ManagementPage>

      <AddExpenseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </PermissionGuard>
  );
};
