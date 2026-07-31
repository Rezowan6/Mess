import { Outlet, useLocation } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { BackButton } from "@/shared/components/ui/BackButton";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const MealEntryPage = () => {
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  return (
    <PermissionGuard permission={PERMISSIONS.MEAL_ENTRY_VIEW}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Meal Entry Management</h1>

            <p className="text-sm opacity-70">
              Manage daily meal entries and meal summaries
            </p>
            {path !== "today-meals" ? (
              <ActionLink to={`${ROUTES.MEAL_ENTRY}/today-meals`}>
                View Today Meals
              </ActionLink>
            ) : (
              <BackButton />
            )}
          </div>

          <Button variant="success" permission={PERMISSIONS.MEAL_ENTRY_CREATE}>
            Add Meal Entry
          </Button>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <Outlet />
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
};
