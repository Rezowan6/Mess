import { Skeleton } from "@/shared/components/feedback/Skeleton";

interface Props {
  rows?: number;
}

export const PaymentHistorySkeleton = ({ rows = 4 }: Props) => {
  return (
    <ul aria-busy="true" className="divide-y divide-theme-border">
      {Array.from({ length: rows }, (_, index) => (
        <li key={index} className="flex items-center gap-3 p-3">
          {/* Icon */}
          <Skeleton className="size-10 shrink-0 rounded-full" />

          {/* Amount, date · method, note */}
          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-40" />
          </div>

          {/* Edit / Delete */}
          <div className="flex items-center gap-1">
            <Skeleton className="size-8 rounded-theme-md" />
            <Skeleton className="size-8 rounded-theme-md" />
          </div>
        </li>
      ))}
    </ul>
  );
};
