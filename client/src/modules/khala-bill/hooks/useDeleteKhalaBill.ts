import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { khalaBillApi } from "../api/khalaBill.api";
import { invalidateKhalaBillQueries } from "../query/khalaBill.invalidation";

export const useDeleteKhalaBill = () => {
  const queryClient = useQueryClient();
  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: (id: number) => khalaBillApi.delete(id),
    onSuccess: () => invalidateKhalaBillQueries(queryClient, { tenantId }),
  });
};
