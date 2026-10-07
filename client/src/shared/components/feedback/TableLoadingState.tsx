import { Skeleton } from "./Skeleton";

interface TableLoadingStateProps {
  rows?: number;
  columns?: number;
}

export const TableLoadingState = ({
  rows = 5,
  columns = 5,
}: TableLoadingStateProps) => {
  return (
    <div className="overflow-hidden rounded-theme-xl border border-theme-border bg-theme-card">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="bg-theme-table-header px-3 py-2">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row} className="bg-theme-table-row">
              {Array.from({ length: columns }).map((_, col) => (
                <td
                  key={col}
                  className="border-b border-theme-border px-3 py-2"
                >
                  <Skeleton
                    className={
                      col === 0
                        ? "h-4 w-36"
                        : col === columns - 1
                          ? "h-8 w-20 rounded-theme-md"
                          : "h-4 w-24"
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
