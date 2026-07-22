import { useQuery } from "@tanstack/react-query";

import { notificationApi } from "../api/notification.api";

export const useUnreadCount = () => {
  return useQuery({
    queryKey: ["notification-count"],

    queryFn: notificationApi.unreadCount,

    refetchInterval: 30000,
  });
};
