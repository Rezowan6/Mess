import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { MealBadges } from "@/shared/components/ui/MealBadges";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatDate, getLocalDate } from "@/shared/utils/date.utils";
import { formatDateTime } from "@/shared/utils/time";
import { CalendarDays, Trash2 } from "lucide-react";
import React from "react";
import { MEAL_REQUEST_HISTORY_MESSAGES } from "../../configs/mealRequestHistory.message";
import { useParmanetDeleteMealReq } from "../../hooks/useParmanetDeleteMealReq";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";

interface MealRequestHistoryProps {
  requests: IMyPendingMealReq[];
}

export const MealRequestHistory: React.FC<MealRequestHistoryProps> = ({
  requests,
}) => {
  const isMobile = useIsMobile();
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const setLoading = useConfirmStore((state) => state.setLoading);
  const deleteMealRequest = useParmanetDeleteMealReq();

  const handleDelete = (request: IMyPendingMealReq) => {
    openConfirm({
      title: "Delete Meal Request",
      message: (
        <>
          Are you sure you want to permanently delete the meal request of{" "}
          <strong className="text-theme-success">
            {request.requester.name}
          </strong>{" "}
          for{" "}
          <strong className="text-theme-danger">
            {formatDate(request.date)}
          </strong>
          ?
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

  if (requests.length === 0) {
    const { title, description } = MEAL_REQUEST_HISTORY_MESSAGES.empty;
    return <EmptyState title={title} description={description} />;
  }
  return (
    <div className="max-h-92 overflow-y-auto">
      <div className="flex-1">
        <div className="divide-y divide-theme-border">
          {requests.map((request) => {
            const isCurrentMealReqDate =
              formatDate(request.date) === formatDate(getLocalDate());

            const isDeleteDisabled =
              request.status === "pending" && isCurrentMealReqDate;

            return (
              <div
                key={request.id}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-theme-background"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between  gap-3">
                    <h3 className=" flex items-center gap-1.5 truncate text-[15px] font-semibold text-theme-text">
                      <CalendarDays size={13} />
                      <span>{formatDate(request.date)}</span>
                    </h3>

                    <Badge variant="soft-warning" size="sm">
                      {request.status}
                    </Badge>

                    <Button
                      unstyled
                      disabled={isDeleteDisabled}
                      tooltip={
                        isDeleteDisabled
                          ? "Today's pending requests cannot be deleted"
                          : isMobile
                            ? undefined
                            : "Delete Request"
                      }
                      className="text-theme-danger"
                      leftIcon={<Trash2 />}
                      onClick={() => handleDelete(request)}
                    />
                  </div>
                  {/* meal Badge */}
                  <MealBadges meals={request} />

                  <div className="mb-2 mt-2 flex gap-1 text-xs text-theme-text-muted sm:flex-row sm:items-center sm:gap-2">
                    <div className="flex  items-center gap-1.5 text-[11px]">
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
