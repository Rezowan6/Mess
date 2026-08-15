import { QueryClient } from "@tanstack/react-query";

import type {
  INotification,
  INotificationResponse,
} from "../types/notification.types";

import { queryKeys } from "@/shared/constants/queryKeys";
import type { ApiResponse } from "@/shared/types/api.types";

export const addNotificationToCache = (
  queryClient: QueryClient,
  notification: INotification,
  tenantId: number,
) => {
  queryClient.setQueryData(
    queryKeys.notifications.list(tenantId),
    (old: INotificationResponse | undefined) => {
      if (!old) return old;
      const total = old.meta?.total ?? 0;

      return {
        ...old,
        data: [notification, ...old.data],
        meta: {
          ...old.meta,
          total: total + 1,
        },
      };
    },
  );

  queryClient.setQueryData(
    queryKeys.notifications.count(tenantId),
    (old: ApiResponse<{ count: number }> | undefined) => {
      if (!old) return old;

      return {
        ...old,
        data: {
          count: old.data.count + 1,
        },
      };
    },
  );
};
