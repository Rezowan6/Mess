import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tenantApi } from "../api/tenant.api";

import { queryKeys } from "@/shared/constants/queryKeys";

export const useCreateTenant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tenantApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tenants.all,
      });
    },
  });
};
