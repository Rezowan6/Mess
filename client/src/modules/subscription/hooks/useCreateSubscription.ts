import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: subscriptionApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.current(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.mySubscriptions(tenantId),
      });
    },
  });
};