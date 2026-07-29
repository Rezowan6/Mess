import { useState } from "react";

import { AddDepositModal } from "../components/AddDepositModal";
import { DepositTable } from "../components/DepositTable";

import { Button } from "@/shared/components/ui/Button";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const DepositPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PermissionGuard permission={PERMISSIONS.DEPOSIT_VIEW}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Deposit Management</h1>

            <p className="text-sm opacity-70">
              Manage member deposits and payment records
            </p>
          </div>

          <Button
            variant="success"
            permission={PERMISSIONS.DEPOSIT_CREATE}
            onClick={() => setIsOpen(true)}
          >
            Add Deposit
          </Button>

          <AddDepositModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <DepositTable />
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
};
