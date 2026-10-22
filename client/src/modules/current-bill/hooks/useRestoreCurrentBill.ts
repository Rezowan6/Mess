import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { currentBillApi } from "../api/current-bill.api";
import { invalidateCurrentBillQueries } from "../query/currentBill.invalidation";

export const useRestoreCurrentBill = () => {
  const queryClient = useQueryClient();
  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: (id: number) => currentBillApi.restore(id),

    onSuccess: async () => {
      invalidateCurrentBillQueries(queryClient, { tenantId });
    },
  });
};
