import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ricePaymentApi } from "../api/ricePayment.api";

import { queryKeys } from "@/shared/constants/queryKeys";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

import type { RicePaymentMethodValue } from "../types/ricePayment.types";

interface BulkSettleRiceDuePayload {
  paymentMethod: RicePaymentMethodValue;
  paymentDate?: string;
  note?: string;
}

export const useBulkSettleRiceDue = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (payload: BulkSettleRiceDuePayload) =>
      ricePaymentApi.bulkSettleDue(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rice.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.ricePayments.due(tenantId, mealSessionId, 0),
      });
    },
  });
};
