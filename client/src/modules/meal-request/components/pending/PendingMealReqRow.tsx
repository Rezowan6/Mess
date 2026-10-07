import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { formatDate } from "@/shared/utils/date.utils";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { formatDateTime } from "@/shared/utils/time";
import React from "react";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";
import { PendingMealReqAction } from "./PendingMealReqAction";
import { MEAL_BADGES } from "./AllPendingMealReq.config";

interface PendingMealReqRowProps {
  request: IMyPendingMealReq;
  currentDate: string;
}


export const PendingMealReqRow = React.memo(
  ({ request, currentDate }: PendingMealReqRowProps) => {
    const requestDate = formatDate(request.date);

    const isCurrentMealReqDate = requestDate === currentDate;
    const isApprovedDisabled = requestDate > currentDate;
    const isRejectDisabled = isCurrentMealReqDate;
    const isDeleteDisabled =
      request.status === "pending" && isCurrentMealReqDate;

    return (
      <div className="flex items-center gap-3 px-2 py-3 transition-colors hover:bg-background">
        <Avatar
          src={request.requester.avatar}
          alt={request.requester.name}
          size="md"
          fallback={getAvatarInitial(request.requester.name)}
        />

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="min-w-0 truncate text-[15px] font-semibold text-base-content">
              {request.requester.name}
            </h3>

            <Badge variant="soft-warning" size="sm">
              {request.status}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {MEAL_BADGES.map(({ key, label, variant }) => (
              <Badge key={key} variant={variant} size="sm">
                {label}: {request[key]}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="my-2 flex flex-col items-center gap-1.5 text-[11px] text-base-content/50 sm:flex-row">
              <span>Created: {formatDateTime(request.createdAt)}</span>
              <span>Updated: {formatDateTime(request.updatedAt)}</span>
            </div>

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
  },
);

PendingMealReqRow.displayName = "PendingMealReqRow";
