import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { CurrentBillFormModal } from "../components/CurrentBillFormModal";
import { getCurrentBillPageConfig } from "../configs/currentBill.page.config";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const CurrentBillPage = () => {
  const [isCurrentBillOpen, setIsCurrentBillOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsCurrentBillOpen(false);
  }, [location.pathname]);

  const currentPage = getCurrentBillPageConfig({
    pathname: location.pathname,
    onAddCurrentBill: () => setIsCurrentBillOpen(true),
  });

  return (
    <PermissionGuard permission={PERMISSIONS.CURRENT_BILL_VIEW}>
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={
          <AddButton
            permission={PERMISSIONS.CURRENT_BILL_CREATE}
            label={currentPage.actionText}
            onClick={currentPage.onAction}
          />
        }
      >
        <Outlet />
      </ManagementPage>

      {isCurrentBillOpen && (
        <CurrentBillFormModal
          isOpen={isCurrentBillOpen}
          onClose={() => setIsCurrentBillOpen(false)}
        />
      )}
    </PermissionGuard>
  );
};
