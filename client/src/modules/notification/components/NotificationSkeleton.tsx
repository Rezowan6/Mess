import { Skeleton } from "@/shared/components/feedback/Skeleton";

interface NotificationSkeletonProps {
  count?: number;
}

export const NotificationSkeleton = ({
  count = 5,
}: NotificationSkeletonProps) => {
  return (
    <div aria-busy="true" aria-label="Loading notifications">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex items-start gap-3 border-b border-theme-border p-4 last:border-0"
        >
          {/* Status indicator */}
          <Skeleton className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                {/* Title */}
                <Skeleton className="h-4 w-1/3" />
                {/* Message */}
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>

              {/* Delete button */}
              <Skeleton className="h-8 w-8 shrink-0 rounded-theme-md" />
            </div>

            {/* New badge */}
            <Skeleton className="mt-2 h-5 w-10 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
