import { useMealSession } from "@/modules/meal-session/hooks/useMealSession";
import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { Badge } from "@/shared/components/ui/Badge";

export const MealSessionStatus = () => {
  const { data, isPending } = useMealSession();

  if (isPending) {
    return <Skeleton className="w-28 h-7 rounded-lg" />;
  }

  const isOpen = data?.data.data?.status === "open";

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
