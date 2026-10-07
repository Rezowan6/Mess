import { Skeleton } from "@/shared/components/feedback/Skeleton";

import { PaymentHistorySkeleton } from "./PaymentHistorySkeleton";

export const RiceHistoryPageSkeleton = () => {
  return (
    <div aria-busy="true" className="space-y-5">
      {/* RiceHistoryHeader */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-4 w-48" />
      </div>

      {/* RicePurchaseInfo */}
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>

      {/* RicePaymentSummary */}
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="space-y-2 p-3">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>

      {/* RicePaymentProgress */}
      <div className="space-y-1">
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="h-3 w-16" />
      </div>

      {/* RicePaymentHistory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-9 w-32 rounded-full" />
        </div>

        <PaymentHistorySkeleton rows={4} />
      </div>
    </div>
  );
};
