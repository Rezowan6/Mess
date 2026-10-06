import type { QueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

export const invalidateTenantUserQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.tenants.all,
  });
};
