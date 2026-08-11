import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";

export const mealPlanningApi = {
  getDailyMealPlanning: async () => {
    const res = await API.get(API_ENDPOINTS.MEAL_PLANNING.DAILY);

    return res.data;
  },
};
