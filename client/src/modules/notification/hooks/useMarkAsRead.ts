import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notificationApi } from "../api/notification.api";
import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: notificationApi.markAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all(tenantId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.count(tenantId),
      });
    },
  });
};
