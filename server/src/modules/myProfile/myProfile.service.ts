import { eggRepository } from "../egg/egg.repository.js";
import { eggRateRepository } from "../eggRates/eggRate.repository.js";
import { monthlyCalculationRepository } from "../monthlyCalculation/monthlyCalculation.repository.js";
import { partyExpenseRepository } from "../PartyExpense/partyExpense.repository.js";
import { partyExpenseMemberRepository } from "../PartyExpenseMember/partyExpenseMember.repository.js";
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
      totalPartyExpense,
      mealSummary,
      myMealSummary,
      myDeposit,
      deposits,
      meals,
      memberPartyCosts,
      totalEggQuantity,
      myEggSummary,
      eggRate,
    ] = await Promise.all([
      myProfileRepository.getMyProfileUser({
        tenantId,
        userId,
      }),

      monthlyCalculationRepository.getTotalExpense(tenantId, mealSessionId),

      partyExpenseRepository.getTotalPartyExpense(tenantId, mealSessionId),

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

      partyExpenseMemberRepository.getMemberPartyExpenseTotals(
        tenantId,
        mealSessionId,
      ),

      eggRepository.getTotalEggQuantity(tenantId, mealSessionId),

      myProfileRepository.getMyEggSummary({
        tenantId,
        mealSessionId,
        memberId: userId,
      }),
      eggRateRepository.getEggRate(tenantId, mealSessionId),
    ]);

    // egg related calculation
    const currentEggRate = Number(eggRate?.rate ?? 0);

    const totalEggCost = Number(
      (Number(totalEggQuantity) * currentEggRate).toFixed(2),
    );

    const myEggQuantity = Number(myEggSummary?.totalEgg ?? 0);

    const myEggCost = Number((myEggQuantity * currentEggRate).toFixed(2));

    const grandTotalMeals = Number(mealSummary?.grandTotalMeals ?? 0);

    // Party expense বাদ দিয়ে normal expense
    const normalExpense =
      Number(totalExpense ?? 0) -
      Number(totalPartyExpense ?? 0) -
      Number(totalEggCost ?? 0);

    // Normal meal rate
    const mealRate =
      grandTotalMeals > 0
        ? Number((normalExpense / grandTotalMeals).toFixed(2))
        : 0;

    const totalMeal = Number(myMealSummary?.totalMeal ?? 0);

    const totalDeposit = Number(myDeposit ?? 0);

    // এই member-এর সব party expense-এর total
    const myPartyCost = Number(
      memberPartyCosts.find((item: any) => Number(item.memberId) === userId)
        ?.totalPartyCost ?? 0,
    );

    // Normal meal cost
    const normalMealCost = Number((totalMeal * mealRate).toFixed(2));

    // Normal meal cost + party cost
    const memberCost = Number(
      (normalMealCost + myPartyCost + myEggCost).toFixed(2),
    );

    const balance = Number((totalDeposit - memberCost).toFixed(2));

    return {
      member: member?.user,

      summary: {
        totalMeal,
        deposit: totalDeposit,

        mealRate,

        normalMealCost,
        partyCost: Number(myPartyCost.toFixed(2)),

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

      eggSummary: {
        totalEgg: myEggQuantity,
        eggRate: currentEggRate,
        eggCost: myEggCost,
      },

      deposits,
      meals,
    };
  }
}

export const myProfileService = new MyProfileService();
