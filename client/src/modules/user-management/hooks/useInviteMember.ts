import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userManagementApi } from "../api/userManagement.api";

export const useInviteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userManagementApi.inviteMember,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenant-members"],
      });
    },
  });
};
