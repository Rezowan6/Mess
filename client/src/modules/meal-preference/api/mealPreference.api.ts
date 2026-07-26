import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { IUpsertMealPreferenceDto } from "../types/mealPreference.types";

export const mealPreferenceApi = {
  getMyPreference: async () => {
    const res = await API.get(API_ENDPOINTS.MEAL_PREFERENCE.LIST_ME);

    return res.data;
  },

  upsert: async (payload: IUpsertMealPreferenceDto) => {
    const res = await API.post(API_ENDPOINTS.MEAL_PREFERENCE.UPSERT, payload);

    return res.data;
  },
};
