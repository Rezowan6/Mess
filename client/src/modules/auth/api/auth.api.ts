import type {
  IAuthUser,
  ILoginPayload,
  ILoginResponse,
} from "../types/auth.types";

import { API } from "@/shared/lib/axios";

import { API_ENDPOINTS } from "@/shared/constants/api";
import type { ApiResponse } from "@/shared/types/api.types";

export const authApi = {
  login: async (payload: ILoginPayload): Promise<ILoginResponse> => {
    const { data } = await API.post<ILoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload,
    );

    return data;
  },

  getMe: async (): Promise<IAuthUser> => {
    const { data } = await API.get<{ data: IAuthUser }>(API_ENDPOINTS.AUTH.ME);

    return data.data;
  },

  logout: async () => {
    const { data } = await API.post<ApiResponse<null>>(
      API_ENDPOINTS.AUTH.LOGOUT,
    );

    return data;
  },
};
