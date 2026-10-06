import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { notificationApi } from "../api/notification.api";
import { invalidateNotificationQueries } from "../query/notification.invalidation";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: notificationApi.markAsRead,

    onSuccess: () => {
      invalidateNotificationQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
