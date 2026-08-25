import { useQuery } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import { userManagementApi } from "../api/userManagement.api";
import type {
  IMemberListResponse,
  IMemberParams,
} from "../types/userManagement.types";

export const useMembers = (params: IMemberParams) => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery<IMemberListResponse>({
    queryKey: [...queryKeys.tenants.members(currentTenant?.tenantId), params],

    queryFn: async () => userManagementApi.getMembers(params),

    placeholderData: (previous) => previous,

    enabled: !!currentTenant,

    staleTime: 1000 * 60 * 5,
  });
};
