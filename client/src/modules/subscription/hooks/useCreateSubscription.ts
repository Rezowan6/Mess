import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.current,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.mySubscriptions,
      });
    },
  });
};