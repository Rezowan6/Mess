import { monthlyCalculationRepository } from "../monthlyCalculation/monthlyCalculation.repository.js";
import { myProfileRepository } from "./myProfile.repository.js";

class MyProfileService {
  async getMyProfile({
    tenantId,
    mealSessionId,
    userId,
  }: {
    tenantId: number;
    mealSessionId: number;
    userId: number;
  }) {
    const [
      member,
      totalExpense,
      mealSummary,
      myMealSummary,
      myDeposit,
      deposits,
      meals,
    ] = await Promise.all([
      myProfileRepository.getMyProfileUser({
        tenantId,
        userId,
      }),

      monthlyCalculationRepository.getTotalExpense(tenantId, mealSessionId),

      monthlyCalculationRepository.getTotalMeal(tenantId, mealSessionId),

      myProfileRepository.getMyMealSummary({
        tenantId,
        mealSessionId,
        userId,
      }),

      myProfileRepository.getMyDepositSummary({
        tenantId,
        mealSessionId,
        memberId: userId,
      }),

      myProfileRepository.getMyDeposits({
        tenantId,
        mealSessionId,
        memberId: userId,
      }),

      myProfileRepository.getMyMeals({
        tenantId,
        mealSessionId,
        userId,
      }),
    ]);

    const grandTotalMeals = Number(mealSummary?.grandTotalMeals ?? 0);

    const mealRate =
      grandTotalMeals > 0
        ? Number((totalExpense / grandTotalMeals).toFixed(2))
        : 0;

    const totalMeal = Number(myMealSummary?.totalMeal ?? 0);

    const totalDeposit = Number(myDeposit ?? 0);

    const memberCost = Number((totalMeal * mealRate).toFixed(2));

    const balance = Number((totalDeposit - memberCost).toFixed(2));

    return {
      member: member?.user,

      summary: {
        totalMeal,

        deposit: totalDeposit,

        mealRate,

        memberCost,

        balance,

        status:
          balance > 0 ? "Received" : balance === 0 ? "Settled" : "Payable",
      },

      mealSummary: {
        breakfast: Number(myMealSummary?.breakfast ?? 0),
        lunch: Number(myMealSummary?.lunch ?? 0),
        dinner: Number(myMealSummary?.dinner ?? 0),
        total: totalMeal,
      },

      deposits,

      meals,
    };
  }
}

export const myProfileService = new MyProfileService();
