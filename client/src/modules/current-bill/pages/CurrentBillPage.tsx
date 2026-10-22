import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { CurrentBillFormModal } from "../components/CurrentBillFormModal";
import { ArchiveRestore } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";

export const CurrentBillPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <PermissionGuard permission={PERMISSIONS.CURRENT_BILL_VIEW}>
      <ManagementPage
        title="Current-bill Management"
        description="Manage member current-bill and payment records"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              leftIcon={<ArchiveRestore size={16} />}
              onClick={() => navigate(`${ROUTES.CURRENT_BILL}/deleted`)}
            >
              Deleted Bills
            </Button>

            <AddButton
              permission={PERMISSIONS.CURRENT_BILL_CREATE}
              label="Current-bill"
              onClick={() => setIsOpen(true)}
            />
          </div>
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
