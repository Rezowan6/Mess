import { useQuery } from "@tanstack/react-query";


import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { noticeApi } from "../api/notice.api";
import type { INoticeQuery } from "../types/notice.types";

export const useNotices = (params?: INoticeQuery) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useQuery({
    queryKey: [
      ...queryKeys.notices.list({ tenantId, mealSessionId }),
      params,
    ],

    queryFn: () => noticeApi.getAll(params),

    enabled: Boolean(tenantId && mealSessionId),

    placeholderData: (previous) => previous,

    staleTime: 1000 * 60 * 5,
  });
};
