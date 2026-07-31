import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

import { ROUTES } from "@/shared/constants/routes";

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,

    onSuccess: () => {
      setTimeout(() => {
        window.location.replace(ROUTES.LOGIN);
      }, 1000);
    },
  });
};
