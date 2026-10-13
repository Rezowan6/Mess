import { useMutation, useQueryClient } from "@tanstack/react-query";


import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { noticeApi } from "../api/notice.api";
import { invalidateNoticeQueries } from "../query/notice.invalidation";

export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: noticeApi.create,

    onSuccess: () => {
      invalidateNoticeQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
