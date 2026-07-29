import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const DepositTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-base-300">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>Member</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="odd:bg-base-100 even:bg-base-200/30">
              {/* Member */}
              <td>
                <Skeleton className="h-4 w-32" />
              </td>

              {/* Amount */}
              <td>
                <Skeleton className="h-4 w-20" />
              </td>

              {/* Payment Method */}
              <td>
                <Skeleton className="h-7 w-24 rounded-full" />
              </td>

              {/* Date */}
              <td>
                <Skeleton className="h-4 w-28" />
              </td>

              {/* Note */}
              <td>
                <Skeleton className="h-4 w-40" />
              </td>

              {/* Buttons */}
              <td>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20 rounded-lg" />

                  <Skeleton className="h-9 w-20 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
