import { formatDate, getLocalDate } from "@/shared/utils/date.utils";
import { groupBy } from "@/shared/utils/group.utils";
import { sortBy } from "@/shared/utils/sort.utils";
import React, { useMemo } from "react";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";
import { AllPendingMealReqPageSkeleton } from "./AllPendingMealReqPageSkeleton";
import { PendingMealReqGroup } from "./PendingMealReqGroup";

interface AllPendingMealReqTableProps {
  requests: IMyPendingMealReq[];
  isPending: boolean;
}

export const AllPendingMealReqTable: React.FC<AllPendingMealReqTableProps> = ({
  requests,
  isPending,
}) => {
  const currentDate = formatDate(getLocalDate());

  if (isPending) {
    return <AllPendingMealReqPageSkeleton />;
  }

  const groups = useMemo(
    () =>
      Array.from(
        groupBy(requests, (request) => formatDate(request.date)),
        ([date, items]) => ({
          date,
          items: sortBy(items, (request) => request.requester.name, "desc"),
        }),
      ),
    [requests],
  );

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      {groups.map(({ date, items }) => (
        <PendingMealReqGroup
          key={date}
          date={date}
          items={items}
          currentDate={currentDate}
        />
      ))}
    </div>
  );
};
