import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";

export const useActivateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => subscriptionApi.activate(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.current,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.mySubscriptions,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.byId(id),
      });
    },
  });
};