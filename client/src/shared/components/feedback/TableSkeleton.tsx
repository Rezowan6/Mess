import clsx from "clsx";

import { Skeleton } from "./Skeleton";

export interface TableSkeletonColumn {
  key: string;
  title: string;
  /** Skeleton className. Pass an array to render multiple skeletons in one cell (e.g. action buttons). */
  skeleton: string | string[];
  /** Extra className for both th and td */
  className?: string;
  hideOnMobile?: boolean;
}

interface TableSkeletonProps {
  columns: TableSkeletonColumn[];
  rows?: number;
  className?: string;
}

const DEFAULT_ROWS = 5;

export const TableSkeleton = ({
  columns,
  rows = DEFAULT_ROWS,
  className,
}: TableSkeletonProps) => {
  return (
    <div
      aria-busy="true"
      className={clsx(
        "overflow-x-auto rounded-theme-md border border-theme-border bg-theme-card",
        className,
      )}
    >
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={clsx(
                  "bg-theme-table-header px-3 py-2 text-xs font-semibold uppercase tracking-wide text-theme-text-secondary",
                  column.className,
                  column.hideOnMobile && "hidden md:table-cell",
                )}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-theme-table-row even:bg-theme-table-row-alt"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={clsx(
                    "border-b border-theme-border px-3 py-2",
                    column.className,
                    column.hideOnMobile && "hidden md:table-cell",
                  )}
                >
                  {Array.isArray(column.skeleton) ? (
                    <div className="flex gap-2">
                      {column.skeleton.map((skeletonClassName, index) => (
                        <Skeleton key={index} className={skeletonClassName} />
                      ))}
                    </div>
                  ) : (
                    <Skeleton className={column.skeleton} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
