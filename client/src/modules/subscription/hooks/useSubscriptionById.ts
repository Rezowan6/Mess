import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useSubscriptionById = (id: number) => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.subscriptions.byId(tenantId,id),

    queryFn: () => subscriptionApi.getById(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,
  });
};