import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const SubscriptionTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-base-300">
      <table className="w-full">
        <thead>
          <tr className="bg-base-200">
            <th>Plan</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="odd:bg-base-100 even:bg-base-200/30">
              <td>
                <Skeleton className="h-4 w-24" />
              </td>

              <td>
                <Skeleton className="h-4 w-16" />
              </td>

              <td>
                <Skeleton className="h-4 w-16" />
              </td>

              <td>
                <Skeleton className="h-4 w-24" />
              </td>

              <td>
                <Skeleton className="h-4 w-24" />
              </td>

              <td>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
