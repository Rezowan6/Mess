import { Skeleton } from "@/shared/components/feedback/Skeleton";

export const PartyMemberSelectorSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-5 w-32" />

      <Skeleton className="h-5 w-28" />

      <div className="max-h-60 space-y-2 overflow-y-auto rounded-md border border-info p-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg bg-info/10 p-2"
          >
            <Skeleton className="h-5 w-5 rounded" />

            <div className="space-y-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
