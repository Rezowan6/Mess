import { useQuery } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { queryKeys } from "@/shared/constants/queryKeys";

import { userManagementApi } from "../api/userManagement.api";

export const useAllMembers = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery({
    queryKey: queryKeys.tenants.allMembers(currentTenant?.tenantId),

    queryFn: userManagementApi.getAllMembers,

    enabled: !!currentTenant,

    staleTime: 1000 * 60 * 5,
  });
};