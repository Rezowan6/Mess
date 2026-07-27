import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

export const mealSessionApi = {
  getCurrent: () => API.get(API_ENDPOINTS.MEAL_SESSION.GET_OPEN),

  open: () => {
    return API.post(API_ENDPOINTS.MEAL_SESSION.OPEN,);
  },

  close: (id: number) => {
    return API.patch(API_ENDPOINTS.MEAL_SESSION.CLOSE(id));
  },
};
