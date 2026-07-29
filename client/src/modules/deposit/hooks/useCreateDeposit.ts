import { useMutation, useQueryClient } from "@tanstack/react-query";

import { depositApi } from "../api/deposit.api";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

export const useCreateDeposit = () => {
  const queryClient = useQueryClient();

  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: depositApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deposits.list(currentTenant?.tenantId),
      });
    },
  });
};
