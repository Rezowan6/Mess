import { getMonthName } from "@/utils/date.util.js";
import { IMealSessionReq } from "../mealSession/mealSession.interface.js";
import { partyExpenseRepository } from "../PartyExpense/partyExpense.repository.js";
import { partyExpenseMemberRepository } from "../PartyExpenseMember/partyExpenseMember.repository.js";
import { monthlyCalculationRepository } from "./monthlyCalculation.repository.js";

class MonthlyCalculationService {
  async getCurrentMonthCalculation({
    tenantId,
    mealSessionId,
    session,
  }: {
    tenantId: number;
    mealSessionId: number;
    session: IMealSessionReq;
  }) {
    const totalExpense =
      (await monthlyCalculationRepository.getTotalExpense(
        tenantId,
        mealSessionId,
      )) || 0;

    const totalPartyExpense =
      (await partyExpenseRepository.getTotalPartyExpense(
        tenantId,
        mealSessionId,
      )) || 0;

    const mealSummary = await monthlyCalculationRepository.getTotalMeal(
      tenantId,
      mealSessionId,
    );
    const grandTotalMeals = Number(mealSummary?.grandTotalMeals ?? 0);

    // Party expense meal rate-এর মধ্যে যাবে না
    const normalExpense = Number(totalExpense) - Number(totalPartyExpense);

    const mealRate = grandTotalMeals > 0 ? normalExpense / grandTotalMeals : 0;

    // প্রতিটি member-এর মোট party expense
    const memberPartyCosts =
      await partyExpenseMemberRepository.getMemberPartyExpenseTotals(
        tenantId,
        mealSessionId,
      );

    const partyCostMap = new Map<number, number>();

    memberPartyCosts.forEach((item: any) => {
      partyCostMap.set(Number(item.memberId), Number(item.totalPartyCost));
    });

    // active members
    const activeMembers =
      await monthlyCalculationRepository.getActiveMembers(tenantId);

    const memberMeals = await monthlyCalculationRepository.getMemberMeals(
      tenantId,
      mealSessionId,
    );

    const memberDeposits = await monthlyCalculationRepository.getMemberDeposits(
      tenantId,
      mealSessionId,
    );

    const depositMap = new Map();

    memberDeposits.forEach((deposit: any) => {
      depositMap.set(deposit.memberId, Number(deposit.totalDeposit));
    });

    const members = activeMembers.map((member: any) => {
      const mealData = memberMeals.find(
        (item: any) => item.userId === member.userId,
      );
      const partyCost = Number(partyCostMap.get(member.userId) ?? 0);

      const totalMeal = mealData ? Number(mealData.get("totalMeal")) : 0;

      const deposit = Number(depositMap.get(member.userId) ?? 0);

      // Normal meal cost + ওই member-এর party cost
      const normalMealCost = totalMeal * mealRate || 0;

      const memberCost = normalMealCost + partyCost || 0;

      const balance = deposit - memberCost || 0;

      return {
        userId: member.userId,
        name: member.user?.name,
        email: member.user?.email,
        avatar: member.user?.avatar,

        totalMeal: Number(totalMeal.toFixed(2)),
        deposit: Number(deposit.toFixed(2)),

        normalMealCost: Number(normalMealCost.toFixed(2)),
        partyCost: Number(partyCost.toFixed(2)),

        memberCost: Number(memberCost.toFixed(2)),
        balance: Number(balance.toFixed(2)),

        status:
          balance > 0 ? "Received" : balance === 0 ? "Settled" : "Payable",
      };
    });

    const monthName = getMonthName(session.month, session.year);

    return {
      totalExpense: Number(normalExpense.toFixed(2)),
      totalPartyExpense: Number(totalPartyExpense.toFixed(2)),

      totalDeposit: memberDeposits
        .reduce((sum: number, item: any) => sum + Number(item.totalDeposit), 0)
        .toFixed(2),

      grandTotalMeals: Number(grandTotalMeals.toFixed(2)),
      mealRate: Number(mealRate.toFixed(2)),

      members,

      month: monthName,
      year: session.year,
    };
  }
}

export const monthlyCalculationService = new MonthlyCalculationService();
