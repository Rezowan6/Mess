import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { paymentApi } from "../api/payment.api";

export const usePayments = () => {
  return useQuery({
    queryKey: queryKeys.payments.list,
    queryFn: paymentApi.getAll,
  });
};