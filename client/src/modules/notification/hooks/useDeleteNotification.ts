// useDeleteNotification.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { notificationApi } from "../api/notification.api";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationApi.delete,

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
