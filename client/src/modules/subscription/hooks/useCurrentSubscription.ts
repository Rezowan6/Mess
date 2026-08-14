import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useCurrentSubscription = () => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.subscriptions.current(tenantId),

    queryFn: subscriptionApi.getCurrent,

    staleTime: 1000 * 60 * 5,
  });
};