import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type {
  ICreateMealRequestByDatePayload,
  ICreateMealRequestPayload,
  IMyPendingMealReqResponse,
} from "../types/mealRequest.types";

export const mealRequestApi = {
  create: async (payload: ICreateMealRequestPayload) => {
    const res = await API.post(API_ENDPOINTS.MEAL_REQUEST.CREATE, payload);

    return res.data;
  },
  createByDate: async (payload: ICreateMealRequestByDatePayload) => {
    const res = await API.post(API_ENDPOINTS.MEAL_REQUEST.CREATE_BY_DATE, payload);

    return res.data;
  },
  parmanetDeleteMealReq: async (id: number) => {
    const res = await API.delete(
      API_ENDPOINTS.MEAL_REQUEST.PARMANENT_DELETE_REQ(id),
    );

    return res.data;
  },

  getMyPendingMealReq: async (): Promise<IMyPendingMealReqResponse> => {
    const res = await API.get<IMyPendingMealReqResponse>(
      API_ENDPOINTS.MEAL_REQUEST.MY_PENDING_REQ,
    );

    return res.data;
  },
};
