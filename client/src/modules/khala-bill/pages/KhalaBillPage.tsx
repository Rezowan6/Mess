import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

import { KhalaBillFormModal } from "../components/KhalaBillFormModal";

export const KhalaBillPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <PermissionGuard permission={PERMISSIONS.KHALA_BILL_VIEW}>
      <ManagementPage
        title="Khala Bill Management"
        description="Manage monthly Khala bills for mess members"
        action={
          <AddButton
            permission={PERMISSIONS.KHALA_BILL_CREATE}
            label="Khala Bill"
            onClick={() => setIsOpen(true)}
          />
        }
      >
        <Outlet />
      </ManagementPage>

      {isOpen && <KhalaBillFormModal isOpen onClose={() => setIsOpen(false)} />}
    </PermissionGuard>
  );
};
