import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { userManagementApi } from "../api/userManagement.api";

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userManagementApi.removeMember(id),

    onSuccess: (res) => {
      toast.success(res.message ?? "Member removed successfully.");

      queryClient.invalidateQueries({
        queryKey: ["tenant-members"],
      });
    },

    onError: (err) => {
      toast.error(err.message ?? "Member remove failed");
    },
  });
};
