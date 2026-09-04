import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatDate } from "@/shared/utils/date.utils";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
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
  const { mutate: deleteMealRequest } = useParmanetDeleteMealReq();

  return (
    <div className="max-h-92 bg-info/5 overflow-y-auto">
      <div className="py-4">
        <h2 className="text-lg font-semibold text-base-content">
          My Meal Requests
        </h2>
        <p className="mt-1 text-sm text-base-content/60">
          Your pending meal requests
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-success/40">
          {requests.map((request) => (
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
                <div className="mb-1 flex items-center justify-between gap-3">
                  <h3 className="truncate text-[15px] font-semibold text-base-content">
                    {request.requester.name}
                  </h3>

                  <Badge variant="soft-warning" size="sm">
                    {request.status}
                  </Badge>

                  <Button
                    unstyled
                    className="flex items-center justify-center"
                    leftIcon={<Trash2 />}
                    onClick={() =>
                      openConfirm({
                        title: "Delete Meal Request",
                        message: (
                          <>
                            Are you sure you want to permanently delete the meal
                            request for{" "}
                            <strong className="text-success">
                              {formatDate(request.date)}
                            </strong>
                          </>
                        ),
                        onConfirm: async () => {
                          deleteMealRequest(request.id);
                        },
                      })
                    }
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
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    <span>{formatDateTime(request.date)}</span>/
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-base-content/50">
                    <span>Created: {formatDateTime(request.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
