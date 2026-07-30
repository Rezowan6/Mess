import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const MealEntryTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-base-300">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>Date</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
            <th>Guest Meal</th>
            <th>Total Meal</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="odd:bg-base-100 even:bg-base-200/30">
              {/* Date */}
              <td>
                <Skeleton className="h-4 w-28" />
              </td>

              {/* Breakfast */}
              <td>
                <Skeleton className="h-4 w-16" />
              </td>

              {/* Lunch */}
              <td>
                <Skeleton className="h-4 w-16" />
              </td>

              {/* Dinner */}
              <td>
                <Skeleton className="h-4 w-16" />
              </td>

              {/* Guest Meal */}
              <td>
                <Skeleton className="h-4 w-20" />
              </td>

              {/* Total */}
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
