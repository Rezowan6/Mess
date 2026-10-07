import { CalendarDays } from "lucide-react";

import { SettingsCard } from "@/modules/settings/components/SettingsCard";

import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { Badge } from "@/shared/components/ui/Badge";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGate } from "@/shared/guards/PermissionGate";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatDate } from "@/shared/utils/date.utils";
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
            <Skeleton className="h-12 w-full" />
          ) : session ? (
            <div className="space-y-3 flex justify-between">
              <div>
                <div>
                  <h3 className="font-medium text-theme-success">
                    Current Session
                  </h3>

                  <p className="text-sm text-theme-text-muted">
                    {session.month}/{session.year}
                  </p>
                </div>

                <div className="text-theme-text-muted text-sm">
                  Status:
                  <Badge variant="soft-success" size="sm">
                    {session.status}
                  </Badge>
                </div>

                <div>
                  <div className="text-sm text-theme-text-muted">
                    Opened At:
                    <span className="ml-2">{formatDate(session.openedAt)}</span>
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
