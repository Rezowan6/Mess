import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { khalaBillApi } from "../api/khalaBill.api";
import { invalidateKhalaBillQueries } from "../query/khalaBill.invalidation";

export const useUpdateKhalaBill = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      khalaBillApi.update(id, payload),

    onSuccess: () => {
      invalidateKhalaBillQueries(queryClient, {
        tenantId,
      });
    },
  });
};
