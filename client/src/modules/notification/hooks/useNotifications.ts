import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { notificationApi } from "../api/notification.api";

export const useNotifications = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: queryKeys.notifications.list(params),

    queryFn: () => notificationApi.getAll(params),
  });
};
