import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const MonthlyCalculationSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="rounded-lg border border-base-300 p-4">
            <Skeleton className="mb-3 h-4 w-28" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-base-300">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Member</th>
              <th>Total Meal</th>
              <th>Deposit</th>
              <th>Member Cost</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="odd:bg-base-100 even:bg-base-200/30">
                <td>
                  <Skeleton className="h-4 w-36" />
                </td>

                <td>
                  <Skeleton className="h-4 w-16" />
                </td>

                <td>
                  <Skeleton className="h-4 w-24" />
                </td>

                <td>
                  <Skeleton className="h-4 w-28" />
                </td>

                <td>
                  <Skeleton className="h-4 w-28" />
                </td>

                <td>
                  <Skeleton className="h-7 w-24 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
