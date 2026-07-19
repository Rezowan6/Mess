interface TableLoadingStateProps {
  rows?: number;
  columns?: number;
}

export const TableLoadingState = ({
  rows = 5,
  columns = 5,
}: TableLoadingStateProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-base-300 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index}>
                <div className="h-4 w-20 animate-pulse rounded bg-base-300" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: columns }).map((_, col) => (
                <td key={col}>
                  <div
                    className={`
                      animate-pulse rounded bg-base-300
                      ${
                        col === 0
                          ? "h-4 w-36"
                          : col === columns - 1
                            ? "h-8 w-20 rounded-md"
                            : "h-4 w-24"
                      }
                    `}
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
