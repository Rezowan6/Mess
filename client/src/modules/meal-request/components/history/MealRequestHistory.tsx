import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Badge } from "@/shared/components/ui/Badge";
import { MealBadges } from "@/shared/components/ui/MealBadges";
import {
  formatDate,
  getLocalDate,
  getRecordTimestamp,
} from "@/shared/utils/date.utils";
import { formatDateTime } from "@/shared/utils/time";
import { CalendarDays } from "lucide-react";
import React from "react";
import { MEAL_REQUEST_HISTORY_MESSAGES } from "../../configs/mealRequestHistory.message";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";
import { MealRequestHistoryAction } from "./MealRequestHistoryAction";

interface MealRequestHistoryProps {
  requests: IMyPendingMealReq[];
}

export const MealRequestHistory: React.FC<MealRequestHistoryProps> = ({
  requests,
}) => {
  if (requests.length === 0) {
    const { title, description } = MEAL_REQUEST_HISTORY_MESSAGES.empty;
    return <EmptyState title={title} description={description} />;
  }

  const today = formatDate(getLocalDate());

  return (
    <div className="max-h-92 overflow-y-auto">
      <div className="divide-y divide-theme-border">
        {requests.map((req) => {
          const isCurrentMealReqDate = formatDate(req.date) === today;

          const isDeleteDisabled =
            req.status === "pending" && isCurrentMealReqDate;

          const timestamp = getRecordTimestamp(req.createdAt, req.updatedAt);

          return (
            <div
              key={req.id}
              className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-theme-surface-hover"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center  rounded-theme-md bg-theme-brand-gradient text-theme-on-brand shadow-theme-brand">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                {/* Top row: date + status + actions */}
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-semibold text-theme-text">
                      {formatDate(req.date)}
                    </h3>
                  </div>

                  <div className="flex shrink-0 items-center gap-4 md:gap-6">
                    <Badge variant="soft-warning" size="sm">
                      {req.status}
                    </Badge>

                    <MealRequestHistoryAction
                      request={req}
                      isDeleteDisabled={isDeleteDisabled}
                    />
                  </div>
                </div>

                {/* Meals */}
                <MealBadges meals={req} />

                {/* Timestamps */}
                <span className="text-[11px] text-theme-text-muted">
                  {timestamp.label}: {formatDateTime(timestamp.value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
