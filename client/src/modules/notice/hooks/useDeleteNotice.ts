import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateNoticeQueries } from "../query/notice.invalidation";
import { noticeApi } from "../api/notice.api";

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: noticeApi.delete,

    onSuccess: () => {
        invalidateNoticeQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
