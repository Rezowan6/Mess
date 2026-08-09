import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";

export const useTenantSubscriptions = () => {
  return useQuery({
    queryKey: queryKeys.subscriptions.mySubscriptions,

    queryFn: subscriptionApi.getTenantSubscriptions,

    staleTime: 1000 * 60 * 5,
  });
};