import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { paymentApi } from "../api/payment.api";

export const usePayment = (id: number) => {
  return useQuery({
    queryKey: queryKeys.payments.byId(id),
    queryFn: () => paymentApi.getById(id),
    enabled: !!id,
  });
};