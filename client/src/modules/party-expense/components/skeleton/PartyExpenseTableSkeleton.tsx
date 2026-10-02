// File: PartyExpenseTableSkeleton.tsx

import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const PartyExpenseTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-base-300">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Members</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="odd:bg-base-100 even:bg-base-200/30">
              <td>
                <Skeleton className="h-4 w-28" />
              </td>

              <td>
                <Skeleton className="h-4 w-20" />
              </td>

              <td>
                <Skeleton className="h-4 w-40" />
              </td>

              <td>
                <Skeleton className="h-4 w-16" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
