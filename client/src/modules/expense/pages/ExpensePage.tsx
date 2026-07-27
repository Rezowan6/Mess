import { useState } from "react";
import { AddExpenseModal } from "../components/AddExpenseModal";

import { ExpenseTable } from "../components/ExpenseTable";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { Button } from "@/shared/components/ui/Button";

export const ExpensePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PermissionGuard permission={PERMISSIONS.EXPENSE_VIEW}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Expense Management</h1>

            <p className="text-sm opacity-70">
              Manage mess expenses and records
            </p>
          </div>
          <Button
            variant="success"
            permission={PERMISSIONS.EXPENSE_CREATE}
            onClick={() => setIsOpen(true)}
          >
            Add Expense
          </Button>

          <AddExpenseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <ExpenseTable />
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
};
