import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ricePaymentApi } from "../api/ricePayment.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
interface DeleteRicePaymentVariables {
  riceId: number;
  id: number;
}
export const useDeleteRicePayment = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({ riceId, id }: DeleteRicePaymentVariables) =>
      ricePaymentApi.delete(riceId, id),

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
