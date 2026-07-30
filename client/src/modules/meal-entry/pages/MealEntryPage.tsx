import { Outlet } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const MealEntryPage = () => {
  return (
    <PermissionGuard permission={PERMISSIONS.MEAL_ENTRY_VIEW}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Meal Entry Management</h1>

            <p className="text-sm opacity-70">
              Manage daily meal entries and meal summaries
            </p>
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
