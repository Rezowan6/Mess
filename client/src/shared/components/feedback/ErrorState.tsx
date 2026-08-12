import { Button } from "../ui/Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn't load the requested data. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-6xl">⚠️</div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="my-2 max-w-md text-sm text-base-content/70">
        {description}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
