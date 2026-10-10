import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { MealBadges } from "@/shared/components/ui/MealBadges";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
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
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const setLoading = useConfirmStore((state) => state.setLoading);
  const deleteMealRequest = useParmanetDeleteMealReq();

  const handleDelete = (request: IMyPendingMealReq) => {
    const deleteMsg = (
      <RecordDeleteMessage
        description="Are you sure you want to permanently delete this meal request?"
        details={[
          {
            label: "Member",
            value: request.requester.name,
            highlight: true,
          },
          {
            label: "Date",
            value: formatDate(request.date),
          },
        ]}
      />
    );
    openConfirm({
      title: "Delete Meal Request",
      message: deleteMsg,
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

  const today = formatDate(getLocalDate());

  return (
    <div className="max-h-92 overflow-y-auto">
      <div className="flex-1">
        <div className="divide-y divide-theme-border">
          {requests.map((request) => {
            const isCurrentMealReqDate = formatDate(request.date) === today;

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
                          : undefined
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
