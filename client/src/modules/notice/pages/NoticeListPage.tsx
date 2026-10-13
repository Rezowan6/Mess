import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { AddNoticeModal } from "../components/AddNoticeModal";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const NoticePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <PermissionGuard permission={PERMISSIONS.NOTICE_VIEW}>
      <ManagementPage
        title="Notices"
        description="Create and manage notices for your mess members."
        action={
          <AddButton
            permission={PERMISSIONS.NOTICE_CREATE}
            label="Notice"
            onClick={() => setIsOpen(true)}
          />
        }
      >
        <Outlet />
      </ManagementPage>

      {isOpen && <AddNoticeModal isOpen onClose={() => setIsOpen(false)} />}
    </PermissionGuard>
  );
};
