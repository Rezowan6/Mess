import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { userManagementApi } from "../api/userManagement.api";

export const useInviteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userManagementApi.inviteMember,

    onSuccess: (res) => {
      toast.success(res.message ?? "Invitation sent successfully");

      queryClient.invalidateQueries({
        queryKey: ["tenant-members"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Invitation failed1");
    },
  });
};
