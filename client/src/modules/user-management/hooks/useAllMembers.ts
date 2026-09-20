import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { userManagementApi } from "../api/userManagement.api";

export const useAllMembers = () => {
  const tenantId = useCurrentTenantId();

  return useQuery({
    queryKey: queryKeys.tenants.allMembers(tenantId),

    queryFn: userManagementApi.getAllMembers,

    enabled: !!tenantId,

    staleTime: 1000 * 60 * 5,
  });
};
