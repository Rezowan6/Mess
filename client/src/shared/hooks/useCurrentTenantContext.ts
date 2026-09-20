import { useDashboardSessionStore } from "@/modules/dashboard/store/dashboardSession.store";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";

export const useCurrentTenantContext = () => {
  const tenantId = useTenantStore((state) => state.currentTenant?.tenantId);

  const mealSessionId = useDashboardSessionStore(
    (state) => state.mealSessionId,
  );

  return {
    tenantId,
    mealSessionId,
  };
};
