import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

import { AddPaymentMethodModal } from "../components/AddPaymentMethodModal";

export const PaymentMethodPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <PermissionGuard permission={PERMISSIONS.PAYMENT_METHOD_VIEW}>
      <ManagementPage
        title="Payment Methods"
        description="Manage your payment accounts."
        action={
          <AddButton
            permission={PERMISSIONS.PAYMENT_METHOD_CREATE}
            label="Payment Method"
            onClick={() => setIsOpen(true)}
          />
        }
      >
        <Outlet />
      </ManagementPage>

      {isOpen && (
        <AddPaymentMethodModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </PermissionGuard>
  );
};
