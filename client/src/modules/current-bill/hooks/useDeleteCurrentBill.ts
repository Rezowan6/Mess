import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { currentBillApi } from "../api/current-bill.api";
import { invalidateCurrentBillQueries } from "../query/currentBill.invalidation";

export const useDeleteCurrentBill = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: (id: number) => currentBillApi.delete(id),

    onSuccess: () => {
      invalidateCurrentBillQueries(queryClient, {
        tenantId,
      });
    },
  });
};
