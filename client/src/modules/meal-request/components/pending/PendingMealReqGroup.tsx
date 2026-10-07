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
  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-6 border-b border-info bg-background px-3 py-2">
        <h3 className="text-sm font-semibold text-accent">{date}</h3>

        <span className="text-xs font-medium text-base-content/60">
          {items.length} Members
        </span>
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
