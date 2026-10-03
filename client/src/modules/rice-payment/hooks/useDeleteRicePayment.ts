import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ricePaymentApi } from "../api/ricePayment.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
interface DeleteRicePaymentVariables {
  riceId: number;
  id: number;
}
export const useDeleteRicePayment = (riceId: number) => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ riceId, id }: DeleteRicePaymentVariables) =>
      ricePaymentApi.delete(riceId, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.get(tenantId, mealSessionId, riceId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.byId(tenantId, mealSessionId, riceId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.due(tenantId, mealSessionId, riceId),
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
