import { API } from "@/shared/lib/axios";

import { API_ENDPOINTS } from "@/shared/constants/api";
import type { INotificationResponse } from "../types/notification.types";

export const notificationApi = {
  getAll: async (params?: { page?: number; limit?: number }) => {
    const res = await API.get<INotificationResponse>(
      API_ENDPOINTS.NOTIFICATION.LIST,
      {
        params,
      },
    );

    return res.data;
  },

  unreadCount: async () => {
    const res = await API.get<{
      data: { count: number };
    }>(API_ENDPOINTS.NOTIFICATION.UNREAD_COUNT);

    return res.data;
  },

  markAsRead: async (id: number) => {
    const res = await API.patch(API_ENDPOINTS.NOTIFICATION.MARK_AS_READ(id));

    return res.data;
  },

  delete: async (id: number) => {
    const res = await API.delete(API_ENDPOINTS.NOTIFICATION.DELETE(id));

    return res.data;
  },
};
