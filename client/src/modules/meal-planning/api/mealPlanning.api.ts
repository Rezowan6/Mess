import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type { MealType } from "../types/mealPlanning.types";

export const mealPlanningApi = {
  getDailyMealPlanning: async () => {
    const res = await API.get(API_ENDPOINTS.MEAL_PLANNING.DAILY);

    return res.data;
  },

  rejectMeal: async (
    userId: number,
    meal: MealType,
  ) => {
    const res = await API.patch(
      `${API_ENDPOINTS.MEAL_PLANNING.REJECT}/${userId}/reject`,
      { meal },
    );

    return res.data;
  },
};
