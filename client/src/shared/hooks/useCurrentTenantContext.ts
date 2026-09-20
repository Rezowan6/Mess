import { useDashboardSessionSelection } from "@/modules/dashboard/hooks/useDashboardSessionSelection";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";

export const useCurrentTenantContext = () => {
  const tenantId = useTenantStore((state) => state.currentTenant?.tenantId);

  const { mealSessionId } = useDashboardSessionSelection();

  return {
    tenantId,
    mealSessionId,
  };
};
