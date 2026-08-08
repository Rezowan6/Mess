import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AddDepositModal } from "../components/AddDepositModal";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
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
          <Button
            variant="moduleBtn"
            permission={PERMISSIONS.DEPOSIT_CREATE}
            onClick={() => setIsOpen(true)}
          >
            Add Deposit
          </Button>
        }
        footer={currentPage.footer}
      >
        <Outlet />
      </ManagementPage>
      <AddDepositModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </PermissionGuard>
  );
};
