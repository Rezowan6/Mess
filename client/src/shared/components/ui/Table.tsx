import clsx from "clsx";
import type { ReactNode } from "react";
import { EmptyState } from "../feedback/EmptyState";
import { ErrorState } from "../feedback/ErrorState";
import { TableLoadingState } from "../feedback/TableLoadingState";

export interface TableColumn<T> {
  key: keyof T | string;

  title: ReactNode;

  className?: string;

  hideOnMobile?: boolean;

  render?: (row: T, index: number, actions?: TableActions<T>) => ReactNode;
}

interface TableActions<T> {
  onAddDeposit?: (deposit: T, amount: number) => void;
}

interface TableProps<T> {
  columns: TableColumn<T>[];

  data: T[];

  actions?: TableActions<T>;

  loading?: boolean;

  error?: boolean;

  message?: {
    empty: {
      title: string;
      description: string;
    };
    error: {
      title: string;
      description: string;
    };
  };

  refetch?: () => void;

  action?: React.ReactNode;

  rowKey?: keyof T | ((row: T) => React.Key);

  className?: string;
}

export function Table<T>({
  columns,

  data,

  actions,

  loading = false,

  error = false,

  message,

  refetch,

  action,

  rowKey = "id" as keyof T,

  className,
}: TableProps<T>) {
  if (loading) {
    return <TableLoadingState rows={6} columns={columns.length} />;
  }

  if (error) {
    return (
      <ErrorState
        title={message?.error.title}
        description={message?.error.description}
        onRetry={refetch}
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title={message?.empty.title}
        description={message?.empty.description}
        action={action}
      />
    );
  }

  return (
    <div
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
                key={String(column.key)}
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
          {data.map((row, index) => {
            const key =
              typeof rowKey === "function"
                ? rowKey(row)
                : (row[rowKey] as React.Key);

            return (
              <tr
                key={key}
                className="bg-theme-table-row transition-colors hover:bg-theme-table-row-hover"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={clsx(
                      "border-b border-theme-border px-3 py-2 text-theme-text",
                      column.className,
                      column.hideOnMobile && "hidden md:table-cell",
                    )}
                  >
                    {column.render
                      ? column.render(row, index, actions)
                      : String(row[column.key as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
