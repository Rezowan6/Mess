import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Outlet } from "react-router-dom";

export const SettingsPage = () => {
  return (
    <>
      <ManagementPage
        title="Settings"
        description="Manage your workspace, appearance and application preferences."
      >
        <Outlet />
      </ManagementPage>
    </>
  );
};
