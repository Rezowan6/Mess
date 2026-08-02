import { IMealSessionReq } from "../mealSession/mealSession.interface.js";
import { monthlyCalculationRepository } from "../monthlyCalculation/monthlyCalculation.repository.js";
import { myProfileRepository } from "./myProfile.repository.js";

class MyProfileService {
  async getMyProfileInfo({
    tenantId,
    userId,
    mealSessionId,
  }: {
    tenantId: number;
    userId: number;
    mealSessionId: number;
  }) {
    const member = await myProfileRepository.getMyProfileUser({
      tenantId,
      userId,
    });
    
    const totalExpense = await monthlyCalculationRepository.getTotalExpense(
      tenantId,
      mealSessionId,
    );

    const mealSummary = await monthlyCalculationRepository.getTotalMeal(
      tenantId,
      mealSessionId,
    );

    const grandTotalMeals = Number(mealSummary?.grandTotalMeals ?? 0);

    const mealRate = grandTotalMeals > 0 ? totalExpense / grandTotalMeals : 0;

    const myMeal = await myProfileRepository.getMyMealSummary({
      tenantId,
      mealSessionId,
      userId,
    });

    const totalMeal = Number(myMeal?.totalMeal ?? 0);

    const myDeposit = await myProfileRepository.getMyDepositSummary({
      tenantId,
      mealSessionId,
      memberId: userId,
    });

    const memberCost = totalMeal * mealRate;

    const balance = Number(myDeposit ?? 0) - memberCost;

    return {
      member: member?.user,
      summary: {
        totalMeal,

        deposit: Number(myDeposit ?? 0),

        mealRate: Number(mealRate.toFixed(2)),

        memberCost: Number(memberCost.toFixed(2)),

        balance: Number(balance.toFixed(2)),

        status:
          balance > 0 ? "Received" : balance === 0 ? "Settled" : "Payable",
      },
    };
  }
}

export const myProfileService = new MyProfileService();
