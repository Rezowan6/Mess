import { useQuery } from "@tanstack/react-query";

import { notificationApi } from "../api/notification.api";

export const useNotifications = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["notifications", params],

    queryFn: () => notificationApi.getAll(params),
  });
};
