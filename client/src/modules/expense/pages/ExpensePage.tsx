import { useState } from "react";
import { AddExpenseModal } from "../components/AddExpenseModal";

import { ExpenseTable } from "../components/ExpenseTable";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
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
          <Button
            variant="success"
            permission={PERMISSIONS.EXPENSE_CREATE}
            onClick={() => setIsOpen(true)}
          >
            Add Expense
          </Button>
        }
      >
        <ExpenseTable />
      </ManagementPage>

      <AddExpenseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </PermissionGuard>
  );
};
