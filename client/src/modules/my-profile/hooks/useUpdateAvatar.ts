import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { myProfileApi } from "../api/myProfile.api";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  const { tenantId, mealSessionId } = useCurrentTenantContext();

  return useMutation({
    mutationFn: (file: File) => myProfileApi.updateAvatar(file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myProfile.all(tenantId, mealSessionId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me,
      });
    },
  });
};
