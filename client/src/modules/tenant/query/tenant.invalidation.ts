import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

export const invalidateTenantQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.tenants.all,
  });
};

export const invalidateMembershipQueries = (
  queryClient: QueryClient,
  tenantId?: number,
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.myProfile.all(tenantId),
  });

  queryClient.invalidateQueries({
    queryKey: queryKeys.tenants.allMembers(tenantId),
  });

  queryClient.invalidateQueries({
    queryKey: queryKeys.tenants.members(tenantId),
  });
};
