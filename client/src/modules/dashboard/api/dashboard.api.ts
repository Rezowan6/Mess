import { API_ENDPOINTS } from "@/shared/constants/api";
import { API } from "@/shared/lib/axios";
import type {
  DashboardStatsResponse,
  MealTrendResponse,
} from "../types/dashboard.types";

export const dashboardApi = {
  dashboardStats: async (): Promise<DashboardStatsResponse> => {
    const { data } = await API.get(API_ENDPOINTS.DASHBOARD.STATS);

    return data;
  },

  dashboardMealTrend: async (): Promise<MealTrendResponse> => {
    const { data } = await API.get(API_ENDPOINTS.DASHBOARD.MEAL_TREND);

    return data;
  },
};
