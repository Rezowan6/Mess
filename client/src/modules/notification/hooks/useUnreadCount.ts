import { useQuery } from "@tanstack/react-query";

import { notificationApi } from "../api/notification.api";
import { queryKeys } from "@/shared/constants/queryKeys";

export const useUnreadCount = () => {
  return useQuery({
    queryKey: queryKeys.notifications.count,

    queryFn: notificationApi.unreadCount,

    staleTime: 60 * 1000,
  });
};
