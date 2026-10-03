import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ricePaymentApi } from "../api/ricePayment.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

export const useCreateRicePayment = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ricePaymentApi.create,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.get(
          tenantId,
          mealSessionId,
          variables.riceId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.byId(
          tenantId,
          mealSessionId,
          variables.riceId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.due(tenantId, mealSessionId, variables.riceId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.get(tenantId, mealSessionId),
        refetchType: "active",
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.all(tenantId, mealSessionId),
      });
    },
  });
};
