import { useTenantStore } from "@/modules/tenant/store/tenant.store";

export const useCurrentTenantId = () => {
  return useTenantStore((state) => state.currentTenant?.tenantId);
};
