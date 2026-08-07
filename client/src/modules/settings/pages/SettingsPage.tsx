import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Outlet, useLocation } from "react-router-dom";
import { getSettingsPageConfig } from "../configs/settingsPage.config";

export const SettingsPage = () => {
  const location = useLocation();

  const currentPage = getSettingsPageConfig({
    pathname: location.pathname,
  });
  return (
    <>
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={currentPage.action}
        footer={currentPage.footer}
      >
        <Outlet />
      </ManagementPage>
    </>
  );
};
