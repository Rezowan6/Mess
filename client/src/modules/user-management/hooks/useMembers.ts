import { useQuery } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import { userManagementApi } from "../api/userManagement.api";

export const useMembers = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery({
    queryKey: queryKeys.tenantMembers(currentTenant?.tenantId),

    queryFn: userManagementApi.getMembers,

    enabled: !!currentTenant,

    staleTime: 1000 * 60 * 5,
  });
};
