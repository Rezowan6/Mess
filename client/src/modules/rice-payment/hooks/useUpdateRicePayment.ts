import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ricePaymentApi } from "../api/ricePayment.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useUpdateRicePayment = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Parameters<typeof ricePaymentApi.update>[1];
    }) => ricePaymentApi.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.get(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.all(tenantId, mealSessionId),
      });
    },
  });
};
