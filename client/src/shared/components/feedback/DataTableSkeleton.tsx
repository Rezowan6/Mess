import clsx from "clsx";

import { Skeleton } from "./Skeleton";
import { TableSkeleton, type TableSkeletonColumn } from "./TableSkeleton";

interface DataTableSkeletonProps {
  columns: TableSkeletonColumn[];
  rows?: number;
  /** Mirrors the Pagination below the table. Defaults to true. */
  showPagination?: boolean;
  className?: string;
}

export const DataTableSkeleton = ({
  columns,
  rows = 5,
  showPagination = true,
  className,
}: DataTableSkeletonProps) => {
  return (
    <div aria-busy="true" className={clsx("space-y-4", className)}>
      <TableSkeleton columns={columns} rows={rows} />

      {showPagination && (
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-16 rounded-theme-md" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-9 w-16 rounded-theme-md" />
        </div>
      )}
    </div>
  );
};
