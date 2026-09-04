import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type {
  ICreateMealRequestPayload,
  IMyPendingMealReqResponse,
} from "../types/mealRequest.types";

export const mealRequestApi = {
  create: async (payload: ICreateMealRequestPayload) => {
    const res = await API.post(API_ENDPOINTS.MEAL_REQUEST.CREATE, payload);

    return res.data;
  },

  getMyPendingMealReq: async (): Promise<IMyPendingMealReqResponse> => {
    const res = await API.get<IMyPendingMealReqResponse>(
      API_ENDPOINTS.MEAL_REQUEST.MY_PENDING_REQ,
    );

    return res.data;
  },
};
