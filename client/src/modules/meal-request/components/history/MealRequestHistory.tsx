import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatDate, getCurrentlDate } from "@/shared/utils/date.utils";
import { formatDateTime } from "@/shared/utils/time";
import { CalendarDays, Trash2 } from "lucide-react";
import React from "react";
import { useParmanetDeleteMealReq } from "../../hooks/useParmanetDeleteMealReq";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";

interface MealRequestHistoryProps {
  requests: IMyPendingMealReq[];
}

export const MealRequestHistory: React.FC<MealRequestHistoryProps> = ({
  requests,
}) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const setLoading = useConfirmStore((state) => state.setLoading);
  const deleteMealRequest = useParmanetDeleteMealReq();

  const handleDelete = (request: IMyPendingMealReq) => {
    openConfirm({
      title: "Delete Meal Request",
      message: (
        <>
          Are you sure you want to permanently delete the meal request of{" "}
          <strong className="text-error">{request.requester.name}</strong> for{" "}
          <strong className="text-error">{formatDate(request.date)}</strong>?
        </>
      ),
      onConfirm: async () => {
        setLoading(true);
        try {
          await deleteMealRequest.mutateAsync(request.id);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="max-h-92 rounded-md bg-info/5 overflow-y-auto">
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-success/40">
          {requests.map((request) => {
            const isCurrentMealReqDate =
              formatDate(request.date) === formatDate(getCurrentlDate());

            const isDeleteDisabled =
              request.status === "pending" && isCurrentMealReqDate;

            return (
              <div
                key={request.id}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-background"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between  gap-3">
                    <h3 className=" flex items-center gap-1.5 truncate text-[15px] font-semibold text-base-content">
                      <CalendarDays size={13} />
                      <span>{formatDate(request.date)}</span>
                    </h3>

                    <Badge variant="soft-warning" size="sm">
                      {request.status}
                    </Badge>

                    <Button
                      unstyled
                      disabled={isDeleteDisabled}
                      className="flex items-center justify-center"
                      leftIcon={<Trash2 />}
                      onClick={() => handleDelete(request)}
                    />
                  </div>

                  <div className="flex items-center gap-2">
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
                  <div className="mb-2 mt-2 flex gap-1 text-xs text-base-content/60 sm:flex-row sm:items-center sm:gap-2">
                    <div className="flex  items-center gap-1.5 text-[11px] text-base-content/50">
                      <span>Created: {formatDateTime(request.createdAt)}</span>/
                      <span>Updated: {formatDateTime(request.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
