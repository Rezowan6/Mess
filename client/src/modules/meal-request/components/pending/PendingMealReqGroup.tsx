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

  return (
    <>
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-theme-border bg-theme-background/90 py-2 backdrop-blur-md">
        <Badge
          variant="warning"
          size="sm"
          leftIcon={<CalendarDays />}
          className="min-w-28 tabular-nums"
        >
          {formatDate(date)}
        </Badge>

        <Badge
          variant="info"
          size="sm"
          leftIcon={<Users />}
          className="min-w-28 tabular-nums"
        >
          {`${totalMembers} ${totalMembers === 1 ? "member" : "members"}`}
        </Badge>
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
