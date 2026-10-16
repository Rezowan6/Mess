import React from "react";

import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { MealBadges } from "@/shared/components/ui/MealBadges";
import { formatDate, getRecordTimestamp } from "@/shared/utils/date.utils";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { formatDateTime } from "@/shared/utils/time";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";
import { PendingMealReqAction } from "./PendingMealReqAction";

interface PendingMealReqRowProps {
  request: IMyPendingMealReq;
  currentDate: string; // YYYY-MM-DD (use getLocalDate())
}

const STATUS_VARIANT: Record<
  string,
  "soft-warning" | "soft-success" | "soft-error"
> = {
  pending: "soft-warning",
  approved: "soft-success",
  rejected: "soft-error",
} as const;

export const PendingMealReqRow = React.memo(function PendingMealReqRow({
  request,
  currentDate,
}: PendingMealReqRowProps) {
  // YYYY-MM-DD strings compare correctly with <, > and ===
  const requestDate = formatDate(request.date);

  const isCurrentMealReqDate = requestDate === currentDate;
  const isApprovedDisabled = requestDate > currentDate;
  const isRejectDisabled = isCurrentMealReqDate;
  const isDeleteDisabled = request.status === "pending" && isCurrentMealReqDate;

  const timestamp = getRecordTimestamp(request.createdAt, request.updatedAt);

  return (
    <div className="flex items-center gap-3 px-2 py-3 transition-colors hover:bg-theme-surface-hover">
      <Avatar
        src={request.requester.avatar}
        alt={request.requester.name}
        size="md"
        fallback={getAvatarInitial(request.requester.name)}
      />

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="min-w-0 truncate text-[15px] font-semibold text-theme-text-secondary">
            {request.requester.name}
          </h3>

          <Badge
            variant={STATUS_VARIANT[request.status] ?? "soft-warning"}
            size="sm"
          >
            {request.status}
          </Badge>
        </div>

        <MealBadges meals={request} />

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[11px] text-theme-text-muted">
            {timestamp.label}: {formatDateTime(timestamp.value)}
          </span>

          <PendingMealReqAction
            request={request}
            isApprovedDisabled={isApprovedDisabled}
            isRejectDisabled={isRejectDisabled}
            isDeleteDisabled={isDeleteDisabled}
          />
        </div>
      </div>
    </div>
  );
});
