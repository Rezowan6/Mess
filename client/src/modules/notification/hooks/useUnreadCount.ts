import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { notificationApi } from "../api/notification.api";

export const useUnreadCount = () => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: queryKeys.notifications.count(tenantId, mealSessionId),

    queryFn: notificationApi.unreadCount,

    staleTime: 60 * 1000,
  });
};
