import { API } from "@/shared/lib/axios";

import { API_ENDPOINTS } from "@/shared/constants/api";
import type { IMealSettingResponse } from "../types/mealSetting.types";

export const mealSettingApi = {
  getCurrent: async () => {
    const res = await API.get<IMealSettingResponse>(
      API_ENDPOINTS.MEAL_SETTING.CURRENT,
    );

    return res.data;
  },

  create: async (payload: Partial<IMealSettingResponse["data"]>) => {
    const res = await API.post<IMealSettingResponse>(
      API_ENDPOINTS.MEAL_SETTING.CREATE,
      payload,
    );

    return res.data;
  },

  update: async (payload: Partial<IMealSettingResponse["data"]>) => {
    const res = await API.patch<IMealSettingResponse>(
      API_ENDPOINTS.MEAL_SETTING.UPDATE,
      payload,
    );

    return res.data;
  },

  delete: async (id: number) => {
    const res = await API.delete<{
      statusCode: number;
      success: boolean;
      message: string;
    }>(API_ENDPOINTS.MEAL_SETTING.DELETE(id));

    return res.data;
  },
};
