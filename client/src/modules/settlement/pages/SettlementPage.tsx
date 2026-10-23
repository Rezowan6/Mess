import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

import { SettlementFormModal } from "../components/AddSettlementModal";

export const SettlementPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <PermissionGuard permission={PERMISSIONS.SETTLEMENT_VIEW}>
        <ManagementPage
          title="Settlements"
          description="Manage monthly settlements and member payments."
          action={
            <AddButton
              permission={PERMISSIONS.SETTLEMENT_CREATE}
              label="Settlement"
              onClick={() => setIsOpen(true)}
            />
          }
        >
          <Outlet />
        </ManagementPage>

        {isOpen && (
          <SettlementFormModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </PermissionGuard>
    </>
  );
};
