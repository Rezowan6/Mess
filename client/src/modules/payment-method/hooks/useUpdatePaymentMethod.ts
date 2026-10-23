import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { paymentMethodApi } from "../api/paymentMethod.api";
import { invalidatePaymentMethodQueries } from "../query/paymentMethod.invalidation";
import type { IUpdatePaymentMethodDto } from "../types/paymentMethod.types";

export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload:IUpdatePaymentMethodDto;
    }) => paymentMethodApi.update(id, payload),

    onSuccess: () => {
      invalidatePaymentMethodQueries(queryClient, {
        tenantId,
        mealSessionId,
      });
    },
  });
};
