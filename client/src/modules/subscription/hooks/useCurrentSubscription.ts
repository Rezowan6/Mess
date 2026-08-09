import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";

export const useCurrentSubscription = () => {
  return useQuery({
    queryKey: queryKeys.subscriptions.current,

    queryFn: subscriptionApi.getCurrent,

    staleTime: 1000 * 60 * 5,
  });
};