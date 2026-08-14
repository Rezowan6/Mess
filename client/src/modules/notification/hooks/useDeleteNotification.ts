// useDeleteNotification.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { notificationApi } from "../api/notification.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: notificationApi.delete,

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
