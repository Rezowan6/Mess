import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { userManagementApi } from "../api/userManagement.api";
import type {
  IMemberListResponse,
  IMemberParams,
} from "../types/userManagement.types";

export const useMembers = (params: IMemberParams) => {
  const tenantId = useCurrentTenantId();

  return useQuery<IMemberListResponse>({
    queryKey: [...queryKeys.tenants.members(tenantId), params],

    queryFn: async () => userManagementApi.getMembers(params),

    placeholderData: (previous) => previous,

    enabled: !!tenantId,

    staleTime: 1000 * 60 * 5,
  });
};
