import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const RiceTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-base-300">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Total Paid</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="odd:bg-base-100 even:bg-base-200/30">
              {/* Supplier */}
              <td>
                <Skeleton className="h-4 w-32" />
              </td>

              {/* Quantity */}
              <td>
                <Skeleton className="h-4 w-20" />
              </td>
              {/* TTotal */}
              <td>
                <Skeleton className="h-4 w-20" />
              </td>
              {/* Total Paid */}
              <td>
                <Skeleton className="h-4 w-20" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
