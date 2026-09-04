import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { ICreateMealRequestPayload } from "../types/mealRequest.types";

export const mealRequestApi = {
  create: async (payload: ICreateMealRequestPayload) => {
    const res = await API.post(API_ENDPOINTS.MEAL_REQUEST.CREATE, payload);

    return res.data;
  },
};
