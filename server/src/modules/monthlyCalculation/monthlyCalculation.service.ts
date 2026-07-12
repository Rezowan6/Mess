import { getMonthName } from "@/utils/date.util.js";
import { IMealSessionReq } from "../mealSession/mealSession.interface.js";
import { MonthlyCalculationRepository } from "./monthlyCalculation.repository.js";

export class MonthlyCalculationService {
  static async getCurrentMonthCalculation({
    tenantId,
    mealSessionId,
    session,
  }: {
    tenantId: number;
    mealSessionId: number;
    session: IMealSessionReq;
  }) {
    const totalExpense =
      (await MonthlyCalculationRepository.getTotalExpense(
        tenantId,
        mealSessionId,
      )) || 0;

    const mealSummary = await MonthlyCalculationRepository.getTotalMeal(
      tenantId,
      mealSessionId,
    );
    const grandTotalMeals = Number(mealSummary?.grandTotalMeals ?? 0);

    const mealRate = grandTotalMeals > 0 ? totalExpense / grandTotalMeals : 0;

    const memberMeals = await MonthlyCalculationRepository.getMemberMeals(
      tenantId,
      mealSessionId,
    );

    const memberDeposits = await MonthlyCalculationRepository.getMemberDeposits(
      tenantId,
      mealSessionId,
    );

    const depositMap = new Map();

    memberDeposits.forEach((deposit: any) => {
      depositMap.set(deposit.memberId, Number(deposit.totalDeposit));
    });

    const members = memberMeals.map((member: any) => {
      const totalMeal = Number(member.get("totalMeal"));

      const deposit = depositMap.get(member.userId);

      const memberCost = totalMeal * mealRate;

      const balance = deposit - memberCost;

      return {
        userId: member.userId,
        name: member.user?.name,
        email: member.user?.email,
        avatar: member.user?.avatar,

        totalMeal,
        deposit,
        memberCost: Number(memberCost.toFixed(2)),
        balance,

        status: balance > 0 ? "Recived" : balance == 0 ? "due" : "Pay",
      };
    });

    const monthName = getMonthName(session.month, session.year);

    return {
      totalExpense,
      totalDeposit: memberDeposits.reduce(
        (sum: number, item: any) => sum + Number(item.totalDeposit),
        0,
      ),

      grandTotalMeals,
      mealRate: Number(mealRate.toFixed(2)),

      members,

      month: monthName,
      yerar: session.year,
    };
  }
}
