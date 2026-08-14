import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";
import { notificationApi } from "../api/notification.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useNotifications = (params?: {
  page?: number;
  limit?: number;
}) => {
  const tenantId = useCurrentTenantId();
  return useQuery({
    queryKey: queryKeys.notifications.list(tenantId,params),

    queryFn: () => notificationApi.getAll(params),
  });
};
