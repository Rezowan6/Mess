import { getCurrentDate } from "@/utils/date.util.js";
import { dashboardRepository } from "./dashboard.repository.js";

class DashboardService {
  async getTodayDashboard(tenantId: number, mealSessionId: number) {
    const date = getCurrentDate();

    const [
      totalMembers,
      totalMeals,
      monthlyExpenses,
      monthlyDeposit,
      todayPendingMealReq,
      todayTotalPendingMealReq,
    ] = await Promise.all([
      dashboardRepository.getTotalMembers(tenantId),
      dashboardRepository.getTodayMeals(tenantId, mealSessionId, date),
      dashboardRepository.getTodayExpense(tenantId, mealSessionId, date),
      dashboardRepository.getTodayDeposit(tenantId, mealSessionId, date),
      dashboardRepository.getTodayPendingMealReq(tenantId, mealSessionId, date),
      dashboardRepository.getTodayPendingMealReqCount(
        tenantId,
        mealSessionId,
        date,
      ),
    ]);

    return {
      totalMembers,
      totalMeals: Number(totalMeals?.totalMeals ?? 0),
      monthlyExpenses,
      monthlyDeposit,
      todayPendingMealReq,
      todayTotalPendingMealReq,
    };
  }
}

export const dashboardService = new DashboardService()
