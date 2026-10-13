import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { invalidateNoticeQueries } from "../query/notice.invalidation";
import { noticeApi } from "../api/notice.api";
import type { IUpdateNoticeDto } from "../types/notice.types";

export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: IUpdateNoticeDto;
    }) => noticeApi.update(id, payload),

    onSuccess: () => {
        invalidateNoticeQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
