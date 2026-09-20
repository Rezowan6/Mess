import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { Badge } from "@/shared/components/ui/Badge";
import { useSelectedMealSession } from "../../hooks/useSelectedMealSession";

export const MealSessionStatus = () => {
  const { status, isLoading } = useSelectedMealSession();

  if (isLoading) {
    return <Skeleton className="w-28 h-7 rounded-lg" />;
  }
  if (!status) {
    return null;
  }
  const isOpen = status === "open";

  return (
    <>
      <Badge
        variant={isOpen ? "soft-success" : "soft-warning"}
        className="gap-2 px-3 py-2 text-xs font-semibold"
      >
        <span
          className={`h-2 w-2 rounded-full ${
            isOpen ? "animate-pulse bg-success" : "bg-error"
          }`}
        />

        {isOpen ? "Running..." : "Closed"}
      </Badge>
    </>
  );
};
