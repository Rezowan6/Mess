import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { userManagementApi } from "../api/userManagement.api";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) =>
      userManagementApi.updateRole(id, role),

    onSuccess: (res) => {
      toast.success(res.message ?? "Role updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["tenant-members"],
      });
    },

    onError: (err) => {
      toast.error(err.message ?? "Failed to update role.");
    },
  });
};
