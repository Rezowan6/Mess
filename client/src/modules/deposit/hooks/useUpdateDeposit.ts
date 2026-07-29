import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTenantStore } from "@/modules/tenant/store/tenant.store";

import { queryKeys } from "@/shared/constants/queryKeys";

import { depositApi } from "../api/deposit.api";

import type { IUpdateDepositDto } from "../types/deposit.types";

export const useUpdateDeposit = () => {
  const queryClient = useQueryClient();

  const currentTenant = useTenantStore((state) => state.currentTenant);

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IUpdateDepositDto }) =>
      depositApi.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.deposits.list(currentTenant?.tenantId),
      });
    },
  });
};
