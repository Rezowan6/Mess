import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const MembersTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-base-300">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="odd:bg-base-100 even:bg-base-200/30">
              {/* Avatar + Name */}
              <td>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />

                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </td>

              {/* Email */}
              <td>
                <Skeleton className="h-4 w-48" />
              </td>

              {/* Badge */}
              <td>
                <Skeleton className="h-7 w-20 rounded-full" />
              </td>

              {/* Status */}
              <td>
                <Skeleton className="h-7 w-24 rounded-full" />
              </td>

              {/* Buttons */}
              <td>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20 rounded-lg" />

                  <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
