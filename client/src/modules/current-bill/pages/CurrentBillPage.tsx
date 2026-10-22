import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { CurrentBillFormModal } from "../components/CurrentBillFormModal";

export const CurrentBillPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <PermissionGuard permission={PERMISSIONS.CURRENT_BILL_VIEW}>
      <ManagementPage
        title="Current-bill Management"
        description="Manage member current-bill and payment records"
        action={
          <AddButton
            permission={PERMISSIONS.CURRENT_BILL_CREATE}
            label="Current-bill"
            onClick={() => setIsOpen(true)}
          />
        }
      >
        <Outlet />
      </ManagementPage>

      {isOpen && (
        <CurrentBillFormModal isOpen onClose={() => setIsOpen(false)} />
      )}
    </PermissionGuard>
  );
};
