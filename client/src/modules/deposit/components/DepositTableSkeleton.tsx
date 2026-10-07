import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const DepositTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-theme-md border border-theme-border">
      <table className="table">
        <thead className="bg-theme-surface-sunken">
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr
              key={item}
              className="odd:bg-theme-table-row even:bg-theme-table-row-alt"
            >
              {/* Date */}
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
