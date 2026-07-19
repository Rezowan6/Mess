interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = ({
  title = "No Data Found",
  description = "There is nothing to display right now.",
  action,
}: EmptyStateProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-12 pb-2 text-center">
        <div className="mb-4 text-6xl">📭</div>

        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="mt-2 max-w-md text-sm text-base-content/70">
          {description}
        </p>
      </div>
      {action && <div className="flex items-center justify-center">{action}</div>}
    </>
  );
};
