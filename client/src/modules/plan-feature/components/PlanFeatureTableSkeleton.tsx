import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const PlanFeatureTableSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-xl border border-base-300">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Plan ID</th>
            <th>Feature ID</th>
            <th>Value</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="odd:bg-base-100 even:bg-base-200/30">
              {/* Plan ID */}
              <td>
                <Skeleton className="h-4 w-12" />
              </td>

              {/* Feature ID */}
              <td>
                <Skeleton className="h-4 w-16" />
              </td>

              {/* Value */}
              <td>
                <Skeleton className="h-4 w-24" />
              </td>

              {/* Created At */}
              <td>
                <Skeleton className="h-4 w-24" />
              </td>

              {/* Buttons */}
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
