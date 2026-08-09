import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const PlanTableSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-xl border border-base-300">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>Plan Name</th>
            <th>Slug</th>
            <th>Monthly Price</th>
            <th>Yearly Price</th>
            <th>Members</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="odd:bg-base-100 even:bg-base-200/30">
              {/* Plan Name */}
              <td>
                <Skeleton className="h-4 w-32" />
              </td>

              {/* Slug */}
              <td>
                <Skeleton className="h-4 w-20" />
              </td>

              {/* Monthly Price */}
              <td>
                <Skeleton className="h-7 w-24 rounded-full" />
              </td>
              {/* yearly Price */}
              <td>
                <Skeleton className="h-7 w-24 rounded-full" />
              </td>

              {/* Members*/}
              <td>
                <Skeleton className="h-4 w-12" />
              </td>

              {/* Status */}
              <td>
                <Skeleton className="h-4 w-16" />
              </td>
              {/* Duration */}
              <td>
                <Skeleton className="h-4 w-26" />
              </td>

              {/* Buttons */}
              <td>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-16 rounded-lg" />

                  <Skeleton className="h-9 w-16 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
