import { useQuery } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import { userManagementApi } from "../api/userManagement.api";
import type { ITenantMember } from "../types/userManagement.types";

export const useMembers = () => {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useQuery<ITenantMember[]>({
    queryKey: queryKeys.tenantMembers(currentTenant?.tenantId),

    queryFn: async () => {
      const res = await userManagementApi.getMembers();

      return res.data;
    },

    enabled: !!currentTenant,

    staleTime: 1000 * 60 * 5,
  });
};
