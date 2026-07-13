import { getCurrentDate } from "@/utils/date.util.js";
import { IMealSessionReq } from "../mealSession/mealSession.interface.js";
import { DashboardRepository } from "./dashboard.repository.js";

export class DashboardService {
  static async getManagerDashboard(
    tenantId: number,
    mealSessionId: number,
    session: IMealSessionReq,
  ) {
    const date = getCurrentDate();

    const [
      totalMembers,
      totalMeals,
      monthlyExpenses,
      monthlyDeposit,
      todayPendingMealReq,
      todayTotalPendingMealReq,
    ] = await Promise.all([
      DashboardRepository.getTotalMembers(tenantId),
      DashboardRepository.getTodayMeals(tenantId, mealSessionId, date),
      DashboardRepository.getTodayExpense(tenantId, mealSessionId, date),
      DashboardRepository.getTodayDeposit(tenantId, mealSessionId, date),
      DashboardRepository.getTodayPendingMealReq(tenantId, mealSessionId, date),
      DashboardRepository.getTodayPendingMealReqCount(
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
