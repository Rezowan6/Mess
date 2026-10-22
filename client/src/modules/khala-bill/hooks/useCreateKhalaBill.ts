import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { khalaBillApi } from "../api/khalaBill.api";
import { invalidateKhalaBillQueries } from "../query/khalaBill.invalidation";

export const useCreateKhalaBill = () => {
  const queryClient = useQueryClient();
  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: khalaBillApi.create,
    onSuccess: () => invalidateKhalaBillQueries(queryClient, { tenantId }),
  });
};
