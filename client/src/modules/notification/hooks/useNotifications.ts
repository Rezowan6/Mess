import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { notificationApi } from "../api/notification.api";

export const useNotifications = (params?: {
  page?: number;
  limit?: number;
}) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.notifications.list(tenantId, mealSessionId),

    queryFn: () => notificationApi.getAll(params),
  });
};
