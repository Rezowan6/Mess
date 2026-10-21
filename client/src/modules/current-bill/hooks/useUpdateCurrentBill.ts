import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { currentBillApi } from "../api/current-bill.api";
import { invalidateCurrentBillQueries } from "../query/currentBill.invalidation";

export const useUpdateCurrentBill = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      currentBillApi.update(id, payload),

    onSuccess: () => {
      invalidateCurrentBillQueries(queryClient, {
        tenantId,
      });
    },
  });
};
