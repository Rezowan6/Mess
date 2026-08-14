import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useTenantSubscriptions = () => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.subscriptions.mySubscriptions(tenantId),

    queryFn: subscriptionApi.getTenantSubscriptions,

    staleTime: 1000 * 60 * 5,
  });
};