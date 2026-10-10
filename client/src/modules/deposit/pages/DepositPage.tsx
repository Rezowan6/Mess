import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AddDepositModal } from "../components/AddDepositModal";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { getDepositPageConfig } from "../configs/deposit.page.config";

export const DepositPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const currentPage = getDepositPageConfig({
    pathname: location.pathname,
  });

  return (
    <PermissionGuard permission={PERMISSIONS.DEPOSIT_VIEW}>
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={
          currentPage.showAddButton && (
            <AddButton
              permission={PERMISSIONS.DEPOSIT_CREATE}
              label="Deposit"
              onClick={() => setIsOpen(true)}
            />
          )
        }
        footer={currentPage.footer}
      >
        <Outlet />
      </ManagementPage>

      {isOpen && <AddDepositModal isOpen onClose={() => setIsOpen(false)} />}
    </PermissionGuard>
  );
};
