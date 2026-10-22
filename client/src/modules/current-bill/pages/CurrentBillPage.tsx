import { ArchiveRestore } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { CurrentBillFormModal } from "../components/CurrentBillFormModal";
import { getCurrentBillPageConfig } from "../configs/currentBill.page.config";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const CurrentBillPage = () => {
  const [isCurrentBillOpen, setIsCurrentBillOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsCurrentBillOpen(false);
  }, [location.pathname]);

  const currentPage = getCurrentBillPageConfig({
    pathname: location.pathname,
    onAddCurrentBill: () => setIsCurrentBillOpen(true),
  });

  const isDeletedPage = location.pathname === `${ROUTES.CURRENT_BILL}/deleted`;

  return (
    <PermissionGuard permission={PERMISSIONS.CURRENT_BILL_VIEW}>
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              leftIcon={<ArchiveRestore size={16} />}
              onClick={() =>
                navigate(
                  isDeletedPage
                    ? ROUTES.CURRENT_BILL
                    : `${ROUTES.CURRENT_BILL}/deleted`,
                )
              }
            >
              {isDeletedPage ? "Active Bills" : "Deleted Bills"}
            </Button>

            {!isDeletedPage && (
              <AddButton
                permission={PERMISSIONS.CURRENT_BILL_CREATE}
                label={currentPage.actionText}
                onClick={currentPage.onAction}
              />
            )}
          </div>
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
