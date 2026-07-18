import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userManagementApi } from "../api/userManagement.api";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      userManagementApi.updateRole(id, role),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenant-members"],
      });
    },
  });
};
