import type { ReactNode } from "react";

import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";
import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table, type TableColumn } from "@/shared/components/ui/Table";

interface DataTableSummary {
  label: string;
  amount: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

interface DataTableMeta {
  page: number;
  totalPages: number;
}

interface DataTableSectionProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  meta?: DataTableMeta | undefined;

  isPending: boolean;
  isError: boolean;
  refetch: () => void;

  /** Shown while the first load is running */
  skeleton: ReactNode;
  /** Passed to Table (empty / error texts) */
  message: Parameters<typeof Table>[0]["message"];

  search: string;
  onSearch: (value: string) => void;
  searchPlaceholder?: string | undefined;
  onPageChange?: ((page: number) => void) | undefined;

  /** Optional total box next to the search input */
  summary?: DataTableSummary | undefined;

  /** Modals or anything else that should render after the table */
  children?: ReactNode;
}

export const DataTableSection = <T,>({
  columns,
  data,
  meta,
  isPending,
  isError,
  refetch,
  skeleton,
  message,
  search,
  searchPlaceholder,
  onSearch,
  onPageChange,
  summary,
  children,
}: DataTableSectionProps<T>) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Always rendered, so typing never loses focus */}
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={onSearch}
            placeholder={searchPlaceholder}
          />
        </div>

        {summary && !isPending && (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-theme-success/10 px-4 py-2 sm:justify-end">
            <span className="text-xs font-medium uppercase tracking-wide text-theme-text-muted">
              {summary.label}
            </span>

            <span
              className={`text-lg font-bold tabular-nums ${
                summary.className ?? "text-theme-success"
              }`}
            >
              <AnimatedNumber
                value={summary.amount}
                prefix={summary.prefix}
                suffix={summary.suffix}
                decimals={summary.decimals}
                duration={summary.duration ?? 1200}
              />
            </span>
          </div>
        )}
      </div>

      {isPending ? (
        skeleton
      ) : (
        <>
          <Table
            columns={columns}
            data={data}
            error={isError}
            message={message}
            refetch={refetch}
          />

          {meta && onPageChange && meta.totalPages > 1 && (
            <Pagination
              page={meta.page}
              totalPages={meta.totalPages}
              onChange={onPageChange}
            />
          )}
        </>
      )}

      {children}
    </div>
  );
};
