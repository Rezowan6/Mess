import { CalendarDays } from "lucide-react";

import { SettingsCard } from "@/modules/settings/components/SettingsCard";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGate } from "@/shared/guards/PermissionGate";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { useMealSession } from "../hooks/useMealSession";
import { CloseSessionButton } from "./CloseSessionButton";
import { OpenMealSessionButton } from "./OpenMealSessionButton";

export const MealSessionSettings = () => {
  const { data, isLoading } = useMealSession();

  const { can } = useRBAC();

  const session = data?.data?.data;

  return (
    <PermissionGate permission={PERMISSIONS.MEAL_SESSION_VIEW}>
      <SettingsCard
        title="Meal Session"
        description="Manage your current meal calculation session."
        icon={<CalendarDays size={22} />}
      >
        <div className="p-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : session ? (
            <div className="space-y-3 flex justify-between">
              <div>
                <div>
                  <h3 className="font-medium text-success">Current Session</h3>

                  <p className="text-sm">
                    {session.month}/{session.year}
                  </p>
                </div>

                <div>
                  Status:
                  <span className="ml-2 badge bg-gradient-success px-2">
                    {session.status}
                  </span>
                </div>

                <div>
                  <div className="text-sm">
                    Opened At:
                    <span className="ml-2">
                      {new Date(session.openedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                {can(PERMISSIONS.MEAL_SESSION_CLOSE) && (
                  <CloseSessionButton sessionId={session.id} />
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <p>No active meal session.</p>

              <div className="flex items-end">
                {can(PERMISSIONS.MEAL_SESSION_OPEN) && (
                  <OpenMealSessionButton />
                )}
              </div>
            </div>
          )}
        </div>
      </SettingsCard>
    </PermissionGate>
  );
};
