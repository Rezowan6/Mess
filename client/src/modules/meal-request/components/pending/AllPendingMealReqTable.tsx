import { Badge } from "@/shared/components/ui/Badge";
import { formatDate, getCurrentlDate } from "@/shared/utils/date.utils";
import { formatDateTime } from "@/shared/utils/time";

import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { groupByDate } from "@/shared/utils/group.utils";
import React from "react";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";
import { PendingMealReqAction } from "./PendingMealReqAction";

interface AllPendingMealReqTableProps {
  requests: IMyPendingMealReq[];
}

export const AllPendingMealReqTable: React.FC<AllPendingMealReqTableProps> = ({
  requests,
}) => {
  const groupedRequests = groupByDate(requests, (request) => request.date);

  return (
    <div className="overflow-y-auto rounded-md bg-info/5">
      {Object.entries(groupedRequests).map(([date, dateRequests]) => {
        return (
          <div key={date}>
            {/* date header */}
            <div className="flex items-center gap-6 top-0 z-10 border-b border-info bg-background px-3 py-2">
              <h3 className="text-sm font-semibold text-accent">
                {formatDate(date)}
              </h3>
              <span className="text-xs font-medium text-base-content/60">
                {dateRequests.length} Members
              </span>
            </div>
            {/* Group Date */}
            <div className="divide-y divide-success/40">
              {dateRequests.map((request) => {
                const isPending = request.status === "pending";

                const currentDate = formatDate(getCurrentlDate());
                const requestDate = formatDate(request.date);

                const isCurrentMealReqDate = requestDate === currentDate;

                const isPreviousOrCurrentDate = requestDate <= currentDate;

                const isApprovedDisabled = !isPreviousOrCurrentDate;
                const isRejectDisabled = isCurrentMealReqDate;
                const isDeleteDisabled = isPending && isCurrentMealReqDate;

                return (
                  <div
                    key={request.id}
                    className="flex items-center gap-3 px-2 py-3 transition-colors hover:bg-background"
                  >
                    <Avatar
                      src={request.requester.avatar}
                      alt={request.requester.name}
                      size="md"
                      fallback={getAvatarInitial(request.requester.name)}
                    />
                    <div className="min-w-0 flex-1">
                      {/* Header */}
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="flex min-w-0 items-center gap-1.5 truncate text-[15px] font-semibold text-base-content">
                          <span>{request.requester.name}</span>
                        </h3>

                        <Badge variant="soft-warning" size="sm">
                          {request.status}
                        </Badge>
                      </div>

                      {/* Meal Information */}
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="soft-success" size="sm">
                          Breakfast: {request.breakfast}
                        </Badge>

                        <Badge variant="soft-info" size="sm">
                          Lunch: {request.lunch}
                        </Badge>

                        <Badge variant="soft-secondary" size="sm">
                          Dinner: {request.dinner}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        {/* Date Information */}
                        <div className="mb-2 mt-2 flex gap-1 text-xs text-base-content/60 sm:flex-row sm:items-center sm:gap-2">
                          <div className="flex flex-col sm:flex-row items-center gap-1.5 text-[11px] text-base-content/50">
                            <span>
                              Created: {formatDateTime(request.createdAt)}
                            </span>
                            <span>
                              Updated: {formatDateTime(request.updatedAt)}
                            </span>
                          </div>
                        </div>
                        {/* Actions */}
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
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
