import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: authApi.verifyEmail,
  });
};
