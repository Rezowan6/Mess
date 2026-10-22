import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { khalaBillApi } from "../api/khalaBill.api";
import { invalidateKhalaBillQueries } from "../query/khalaBill.invalidation";
import type { IKhalaBillUpdateDto } from "../types/khalaBill.types";

export const useUpdateKhalaBill = () => {
  const queryClient = useQueryClient();
  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: IKhalaBillUpdateDto;
    }) => khalaBillApi.update(id, payload),

    onSuccess: () => invalidateKhalaBillQueries(queryClient, { tenantId }),
  });
};
