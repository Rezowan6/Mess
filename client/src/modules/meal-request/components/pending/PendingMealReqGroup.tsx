import { Badge } from "@/shared/components/ui/Badge";
import { formatDate } from "@/shared/utils/date.utils";
import { CalendarDays, Users } from "lucide-react";
import React from "react";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";
import { PendingMealReqRow } from "./PendingMealReqRow";

interface PendingMealReqGroupProps {
  date: string;
  items: IMyPendingMealReq[];
  currentDate: string;
}

export const PendingMealReqGroup: React.FC<PendingMealReqGroupProps> = ({
  date,
  items,
  currentDate,
}) => {
  const totalMembers = items.length;
  const isToday = formatDate(date) === currentDate;

  return (
    <>
      <div className="sticky top-0 z-10 border-b border-theme-border bg-theme-surface/95 px-3 py-3 shadow-theme-sm backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-theme-md bg-theme-brand-gradient text-theme-on-brand shadow-theme-brand">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight text-theme-text">
                  {isToday ? "Today" : formatDate(date)}
                </h3>

                {isToday && (
                  <Badge size="sm" variant="soft-error" className="border border-theme-danger/20">
                    Current
                  </Badge>
                )}
              </div>

              <p className="mt-0.5 text-xs text-theme-text-muted">
                Meal requests for this date
              </p>
            </div>
          </div>

          <Badge
            variant="soft-info"
            size="sm"
            leftIcon={<Users className="h-4 w-4" />}
            className="rounded-full border border-theme-info/20 px-3 py-1.5 font-semibold text-theme-text"
          >
            {totalMembers} {totalMembers === 1 ? "member" : "members"}
          </Badge>
        </div>
      </div>

      <div className="divide-y divide-theme-border">
        {items.map((request) => (
          <PendingMealReqRow
            key={request.id}
            request={request}
            currentDate={currentDate}
          />
        ))}
      </div>
    </>
  );
};
