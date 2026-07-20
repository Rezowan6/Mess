import { useQuery } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import { userManagementApi } from "../api/userManagement.api";
import type {
  ITenantMember,
  MemberParams,
} from "../types/userManagement.types";

export const useMembers = (params: MemberParams) => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery<ITenantMember[]>({
    queryKey: queryKeys.tenantMembers(currentTenant?.tenantId),

    queryFn: async () => {
      const res = await userManagementApi.getMembers(params);

      return res.data;
    },

    enabled: !!currentTenant,

    staleTime: 1000 * 60 * 5,
  });
};
