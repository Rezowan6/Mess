import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { paymentApi } from "../api/payment.api";
import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();
  return useMutation({
    mutationFn: paymentApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.payments.list(tenantId),
      });
    },
  });
};