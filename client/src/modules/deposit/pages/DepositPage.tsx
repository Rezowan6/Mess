import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AddDepositModal } from "../components/AddDepositModal";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
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
    onAddDeposit: () => setIsOpen(true),
  });

  return (
    <PermissionGuard permission={PERMISSIONS.DEPOSIT_VIEW}>
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={currentPage.action}
      >
        <Outlet />
      </ManagementPage>
      <AddDepositModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </PermissionGuard>
  );
};
