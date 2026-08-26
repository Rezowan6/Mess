import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/shared/constants/queryKeys";

import { useCurrentTenantId } from "@/shared/hooks/useCurrentTenantId";
import { myProfileApi } from "../api/myProfile.api";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  const tenantId = useCurrentTenantId();

  return useMutation({
    mutationFn: (file: File) => myProfileApi.updateAvatar(file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.myProfile.all(tenantId),
      });
    },
  });
};
