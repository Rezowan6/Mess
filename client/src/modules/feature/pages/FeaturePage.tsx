import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

import { FeatureFormModal } from "../components/FeatureFormModal";
import { getFeaturePageConfig } from "../configs/feature.page.config";

export const FeaturePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const currentPage = getFeaturePageConfig({
    pathname: location.pathname,
    setIsOpen,
  });

  return (
    <PermissionGuard permission={PERMISSIONS.FEATURE_VIEW}>
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={
          <Button
            variant="moduleBtn"
            permission={PERMISSIONS.FEATURE_CREATE}
            onClick={() => setIsOpen(true)}
          >
            Add Feature
          </Button>
        }
        footer={currentPage.footer}
      >
        <Outlet />
      </ManagementPage>

      <FeatureFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </PermissionGuard>
  );
};
