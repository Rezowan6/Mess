import { Skeleton } from "@/shared/components/feedback/Skeleton";

interface Props {
  rows?: number;
}

export const PaymentHistorySkeleton = ({ rows = 5 }: Props) => {
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
          {Array.from({ length: rows }).map((_, index) => (
            <tr
              key={index}
              className="odd:bg-base-100 even:bg-base-200/30"
            >
              {/* Supplier */}
              <td>
                <Skeleton className="h-4 w-32" />
              </td>

              {/* Quantity */}
              <td>
                <Skeleton className="h-4 w-20" />
              </td>

              {/* Total */}
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