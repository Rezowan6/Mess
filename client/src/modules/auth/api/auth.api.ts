import type { LoginPayload, LoginResponse } from "../types/auth.types";

import { API } from "@/shared/lib/axios";

import { API_ENDPOINTS } from "@/shared/constants/api";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await API.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload,
    );

    return data;
  },
};
