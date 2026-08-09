import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";

export const useSubscriptionById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.subscriptions.byId(id),

    queryFn: () => subscriptionApi.getById(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,
  });
};