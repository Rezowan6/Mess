import { Outlet, useLocation } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";
import { getMealEntryPageConfig } from "../configs/mealEntry.page.config";
import { Button } from "@/shared/components/ui/Button";

export const MealEntryPage = () => {
  const location = useLocation();

  const currentPage = getMealEntryPageConfig({
    pathname: location.pathname,
  });

  return (
    <PermissionGuard permission={PERMISSIONS.MEAL_ENTRY_VIEW}>
      <ManagementPage
        title={currentPage.title}
        description={currentPage.description}
        action={<Button disabled variant="moduleBtn" permission={PERMISSIONS.MEAL_ENTRY_CREATE}>add Meal</Button>}
        footer={currentPage.footer}
      >
        <Outlet />
      </ManagementPage>
    </PermissionGuard>
  );
};
