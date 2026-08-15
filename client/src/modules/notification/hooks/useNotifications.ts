import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { notificationApi } from "../api/notification.api";

export const useNotifications = (params?: {
  page?: number;
  limit?: number;
}) => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.notifications.list(tenantId),

    queryFn: () => notificationApi.getAll(params),
  });
};
