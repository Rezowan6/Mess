import { API } from "@/shared/lib/axios";

import { API_ENDPOINTS } from "@/shared/constants/api";
import type { ApiResponse } from "@/shared/types/api.types";

import type { IMyProfile } from "../types/myProfile.types";

export const myProfileApi = {
  getMyProfile: async () => {
    const { data } = await API.get<ApiResponse<IMyProfile>>(
      API_ENDPOINTS.MY_PROFILE.ALL,
    );

    return data;
  },
};
