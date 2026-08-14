import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { notificationApi } from "../api/notification.api";

export const useUnreadCount = () => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.notifications.count(tenantId),

    queryFn: notificationApi.unreadCount,

    staleTime: 60 * 1000,
  });
};
