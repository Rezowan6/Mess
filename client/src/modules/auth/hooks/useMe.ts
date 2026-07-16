import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { API_ENDPOINTS } from "@/shared/constants/api";
import { forceLogout } from "@/shared/utils/forceLogout";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

interface UseMeOptions {
  enabled?: boolean;
}

export const useMe = (options?: UseMeOptions) => {
  const setUser = useAuthStore((state) => state.setUser);

  const query = useQuery({
    queryKey: [API_ENDPOINTS.AUTH.ME],

    queryFn: authApi.me,

    retry: false,

    enabled: options?.enabled,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }

    if (query.isError) {
      forceLogout();
    }
  }, [query.data, setUser]);

  return query;
};
