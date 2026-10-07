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
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-6 border-b border-info bg-background px-3 py-2">
        <Badge
          variant="soft-success"
          size="sm"
          leftIcon={<CalendarDays />}
          className="min-w-28 tabular-nums"
        >
          {formatDate(date)}
        </Badge>

        <Badge
          variant="soft-secondary"
          size="sm"
          leftIcon={<Users />}
          className="min-w-28 tabular-nums"
        >
          {`${totalMembers} ${totalMembers === 1 ? "member" : "members"}`}
        </Badge>
      </div>

      <div className="divide-y divide-success/40">
        {items.map((request) => (
          <PendingMealReqRow
            key={request.id}
            request={request}
            currentDate={currentDate}
          />
        ))}
      </div>
    </div>
  );
};
