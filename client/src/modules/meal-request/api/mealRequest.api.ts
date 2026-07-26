import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type {
  ICreateMealRequestPayload,
  ICreateMealRequestResponse,
} from "../types/mealRequest.types";

export const mealRequestApi = {
  create: async (payload: ICreateMealRequestPayload) => {
    const res = await API.post<{
      data: ICreateMealRequestResponse;
      message: string;
      success: boolean;
    }>(API_ENDPOINTS.MEAL_REQUEST.CREATE, payload);

    return res.data;
  },

  myRequests: async () => {},

  pendingRequests: async () => {},

  approve: async () => {},

  approveRange: async () => {},

  reject: async () => {},
};
