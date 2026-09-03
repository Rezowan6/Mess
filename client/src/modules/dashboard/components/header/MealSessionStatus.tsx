import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { Badge } from "@/shared/components/ui/Badge";

export const MealSessionStatus = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  const isOpen = currentTenant?.status === "active";

  return (
    <Badge
      variant={isOpen ? "soft-info" : "soft-info"}
      className="gap-2 px-3 py-2 text-xs font-semibold"
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isOpen ? "animate-pulse bg-success" : "bg-error"
        }`}
      />

      {isOpen ? "Running..." : "Closed"}
    </Badge>
  );
};
