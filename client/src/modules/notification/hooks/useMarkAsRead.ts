import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notificationApi } from "../api/notification.api";
import { queryKeys } from "@/shared/constants/queryKeys";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationApi.markAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.count,
      });
    },
  });
};
