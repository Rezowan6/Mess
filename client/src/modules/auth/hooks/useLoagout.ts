import { forceLogout } from "@/shared/utils/forceLogout";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,

    onSettled: () => {
      forceLogout();
    },
  });
};
