import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { currentBillApi } from "../api/current-bill.api";
import { invalidateCurrentBillQueries } from "../query/currentBill.invalidation";

export const useCreateCurrentBill = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: currentBillApi.create,

    onSuccess: () => {
      invalidateCurrentBillQueries(queryClient, {
        tenantId,
      });
    },
  });
};
