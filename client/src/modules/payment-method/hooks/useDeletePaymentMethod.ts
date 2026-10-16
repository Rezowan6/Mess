import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { paymentMethodApi } from "../api/paymentMethod.api";
import { invalidatePaymentMethodQueries } from "../query/paymentMethod.invalidation";

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: paymentMethodApi.delete,

    onSuccess: () => {
      invalidatePaymentMethodQueries(queryClient, {
        tenantId,
        mealSessionId,
      });
    },
  });
};
