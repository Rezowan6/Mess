import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { notificationApi } from "../api/notification.api";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: notificationApi.markAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.count(tenantId, mealSessionId),
      });
    },
  });
};
