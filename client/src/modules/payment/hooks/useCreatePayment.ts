import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { paymentApi } from "../api/payment.api";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.payments.list,
      });
    },
  });
};