import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ricePaymentApi } from "../api/ricePayment.api";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";

import { invalidateRicePaymentQueries } from "../query/ricePayment.invalidation";
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
      invalidateRicePaymentQueries(queryClient, { tenantId, mealSessionId });
    },
  });
};
