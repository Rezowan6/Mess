import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { subscriptionApi } from "../api/subscription.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useActivateSubscription = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();
  return useMutation({
    mutationFn: (id: number) => subscriptionApi.activate(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.current(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.mySubscriptions(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.subscriptions.byId(tenantId,id),
      });
    },
  });
};