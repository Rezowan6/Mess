import clsx from "clsx";
import type { ReactNode } from "react";
import { EmptyState } from "../feedback/EmptyState";
import { ErrorState } from "../feedback/ErrorState";
import { TableLoadingState } from "../feedback/TableLoadingState";

export interface TableColumn<T> {
  key: keyof T | string;

  title: ReactNode;

  className?: string;

  render?: (row: T, index: number) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];

  data: T[];

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
        "overflow-x-auto rounded-xl border border-border bg-surface",
        className,
      )}
    >
      <table className="table table-zebra">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>
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
              <tr key={key} className="hover">
                {columns.map((column) => (
                  <td key={String(column.key)} className={column.className}>
                    {column.render
                      ? column.render(row, index)
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
