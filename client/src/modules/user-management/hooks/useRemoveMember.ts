import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userManagementApi } from "../api/userManagement.api";

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userManagementApi.removeMember(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenant-members"],
      });
    },
  });
};
