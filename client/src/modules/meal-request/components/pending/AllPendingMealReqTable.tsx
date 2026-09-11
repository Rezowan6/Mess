import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatDate, getCurrentlDate } from "@/shared/utils/date.utils";
import { formatDateTime } from "@/shared/utils/time";

import { CalendarDays, Check, Trash2, X } from "lucide-react";

import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import React from "react";
import { useParmanetDeleteMealReq } from "../../hooks/useParmanetDeleteMealReq";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";

interface AllPendingMealReqTableProps {
  requests: IMyPendingMealReq[];
}

export const AllPendingMealReqTable: React.FC<AllPendingMealReqTableProps> = ({
  requests,
}) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const { mutate: deleteMealRequest } = useParmanetDeleteMealReq();

  const handleDelete = (request: IMyPendingMealReq) => {
    openConfirm({
      title: "Delete Meal Request",
      message: (
        <>
          Are you sure you want to permanently delete the meal request for{" "}
          <strong className="text-success">{formatDate(request.date)}</strong>?
        </>
      ),
      onConfirm: async () => {
        deleteMealRequest(request.id);
      },
    });
  };

  const handleApprove = (request: IMyPendingMealReq) => {
    openConfirm({
      title: "Approve Meal Request",
      message: (
        <>
          Are you sure you want to approve the meal request for{" "}
          <strong className="text-success">{formatDate(request.date)}</strong>?
        </>
      ),
      onConfirm: async () => {
        // Approve API এখানে call করবেন
        console.log("Approve:", request.id);
      },
    });
  };

  const handleReject = (request: IMyPendingMealReq) => {
    openConfirm({
      title: "Reject Meal Request",
      message: (
        <>
          Are you sure you want to reject the meal request for{" "}
          <strong className="text-error">{formatDate(request.date)}</strong>?
        </>
      ),
      onConfirm: async () => {
        // Reject API এখানে call করবেন
        console.log("Reject:", request.id);
      },
    });
  };

  return (
    <div className="max-h-112 overflow-y-auto rounded-md bg-info/5">
      <div className="divide-y divide-success/40">
        {requests.map((request) => {
          const isCurrentMealReqDate =
            formatDate(request.date) === formatDate(getCurrentlDate());

          const isPending = request.status === "pending";

          const isDeleteDisabled = isPending && isCurrentMealReqDate;

          return (
            <div
              key={request.id}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-background"
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
                  <h3 className="flex min-w-0 items-center gap-1.5 truncate text-[15px] font-semibold text-base-content">
                    <CalendarDays size={13} />

                    <span>{formatDate(request.date)}</span>
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
                      <span>Created: {formatDateTime(request.createdAt)}</span>
                      <span>Updated: {formatDateTime(request.updatedAt)}</span>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex justify-end items-center gap-2">
                    <Button
                      disabled
                      variant="success"
                      onClick={() => handleApprove(request)}
                      leftIcon={<Check size={15} />}
                    />

                    <Button
                      disabled
                      variant="error"
                      leftIcon={<X size={15} />}
                      onClick={() => handleReject(request)}
                    />

                    <Button
                      unstyled
                      disabled={isDeleteDisabled}
                      className="flex items-center justify-center"
                      leftIcon={<Trash2 size={17} />}
                      onClick={() => handleDelete(request)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
