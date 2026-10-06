import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ricePaymentApi } from "../api/ricePayment.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import type { IUpdateRicePayment } from "../types/ricePayment.types";

export const useUpdateRicePayment = (riceId: number) => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: ({
      riceId,
      id,
      payload,
    }: {
      riceId: number;
      id: number;
      payload: IUpdateRicePayment;
    }) => ricePaymentApi.update(riceId, id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.get(
          { tenantId, mealSessionId },
          riceId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.all({ tenantId, mealSessionId }),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.byId({ tenantId, mealSessionId }, riceId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.due({ tenantId, mealSessionId }, riceId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.get({ tenantId, mealSessionId }),
        refetchType: "active",
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.all({ tenantId, mealSessionId }),
      });
    },
  });
};
