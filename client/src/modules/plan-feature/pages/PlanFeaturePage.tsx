import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

import { PlanFeatureFormModal } from "../components/PlanFeatureFormModal";
import { getPlanFeaturePageConfig } from "../configs/planFeature.page.config";

export const PlanFeaturePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const currentPage = getPlanFeaturePageConfig({
    pathname: location.pathname,
    setIsOpen,
  });

  return (
    <PermissionGuard permission={PERMISSIONS.PLAN_FEATURE_VIEW}>
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={
          <Button
            variant="moduleBtn"
            permission={PERMISSIONS.PLAN_FEATURE_CREATE}
            onClick={() => setIsOpen(true)}
          >
            Add Plan Feature
          </Button>
        }
        footer={currentPage.footer}
      >
        <Outlet />

        <PlanFeatureFormModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </ManagementPage>
    </PermissionGuard>
  );
};
