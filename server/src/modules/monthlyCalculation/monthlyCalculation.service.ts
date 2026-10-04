import { getMonthName } from "@/utils/date.util.js";
import { eggRateRepository } from "../eggRates/eggRate.repository.js";
import { IMealSessionReq } from "../mealSession/mealSession.interface.js";
import { partyExpenseRepository } from "../PartyExpense/partyExpense.repository.js";
import { partyExpenseMemberRepository } from "../PartyExpenseMember/partyExpenseMember.repository.js";
import { riceRepository } from "../rice/rice.repository.js";
import { soldProductRepository } from "../soldProduct/soldProduct.repository.js";
import { monthlyCalculationRepository } from "./monthlyCalculation.repository.js";

// Database sums can arrive as strings or null, so always convert before calculating
const toNumber = (value: unknown): number => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

const round2 = (value: number): number => Number(value.toFixed(2));

// Builds a Map<memberId, number> from rows like { memberId, totalX }
const toAmountMap = (
  rows: any[],
  keyField: string,
  valueField: string,
): Map<number, number> =>
  new Map(
    rows.map((row) => [Number(row[keyField]), toNumber(row[valueField])]),
  );

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
    // ------------------------------------------------------------
    // 1. Load all data (independent reads, so they run in parallel)
    // ------------------------------------------------------------
    const [
      totalExpenseRaw,
      totalPartyExpenseRaw,
      totalEggQuantityRaw,
      eggRateData,
      soldProductData,
      mealSummary,
      totalRiceExpenseRaw,
      memberPartyCosts,
      memberEggs,
      activeMembers,
      memberMeals,
      memberDeposits,
    ] = await Promise.all([
      monthlyCalculationRepository.getTotalExpense(tenantId, mealSessionId),
      partyExpenseRepository.getTotalPartyExpense(tenantId, mealSessionId),
      monthlyCalculationRepository.getTotalEggQuantity(tenantId, mealSessionId),
      eggRateRepository.getEggRate(tenantId, mealSessionId),
      soldProductRepository.getSoldProduct(tenantId, mealSessionId),
      monthlyCalculationRepository.getTotalMeal(tenantId, mealSessionId),
      riceRepository.getTotalRiceExpense(tenantId, mealSessionId),
      partyExpenseMemberRepository.getMemberPartyExpenseTotals(
        tenantId,
        mealSessionId,
      ),
      monthlyCalculationRepository.getMemberEggs(tenantId, mealSessionId),
      monthlyCalculationRepository.getActiveMembers(tenantId),
      monthlyCalculationRepository.getMemberMeals(tenantId, mealSessionId),
      monthlyCalculationRepository.getMemberDeposits(tenantId, mealSessionId),
    ]);

    // ------------------------------------------------------------
    // 2. Normalize raw values
    // ------------------------------------------------------------
    const totalExpense = toNumber(totalExpenseRaw);
    const totalPartyExpense = toNumber(totalPartyExpenseRaw);
    const totalEggQuantity = toNumber(totalEggQuantityRaw);
    const totalRiceExpense = toNumber(totalRiceExpenseRaw);
    const totalSoldProductAmount = toNumber(soldProductData?.totalAmount);
    const grandTotalMeals = toNumber(mealSummary?.grandTotalMeals);
    const eggRate = toNumber(eggRateData?.rate);

    // ------------------------------------------------------------
    // 3. Mess level calculation
    // ------------------------------------------------------------
    const totalEggCost = round2(totalEggQuantity * eggRate);

    // Rice is part of the meal cost
    const grandTotalMealCost = totalExpense + totalRiceExpense;

    // Party expense, egg cost and sold products are NOT part of the meal rate
    const normalExpense =
      grandTotalMealCost -
      totalPartyExpense -
      totalEggCost -
      totalSoldProductAmount;

    const mealRate =
      grandTotalMeals > 0 ? round2(normalExpense / grandTotalMeals) : 0;

    // ------------------------------------------------------------
    // 4. Lookup maps (key = userId)
    // ------------------------------------------------------------
    const partyCostMap = toAmountMap(
      memberPartyCosts,
      "memberId",
      "totalPartyCost",
    );
    const eggMap = toAmountMap(memberEggs, "memberId", "totalEgg");
    const depositMap = toAmountMap(memberDeposits, "memberId", "totalDeposit");

    const mealMap = new Map<number, number>(
      memberMeals.map((item: any) => [
        Number(item.userId),
        toNumber(item.get("totalMeal")),
      ]),
    );

    // ------------------------------------------------------------
    // 5. Member level calculation
    // ------------------------------------------------------------
    const members = activeMembers.map((member: any) => {
      const userId = Number(member.userId);

      const totalMeal = mealMap.get(userId) ?? 0;
      const partyCost = partyCostMap.get(userId) ?? 0;
      const eggQuantity = eggMap.get(userId) ?? 0;
      const deposit = depositMap.get(userId) ?? 0;

      const normalMealCost = totalMeal * mealRate;
      const eggCost = round2(eggQuantity * eggRate);

      // Meal cost + this member's party cost + egg cost
      const memberCost = normalMealCost + partyCost + eggCost;

      // Round first, so the status matches what the screen shows
      const balance = round2(deposit - memberCost);

      return {
        userId: member.userId,
        name: member.user?.name,
        email: member.user?.email,
        avatar: member.user?.avatar,

        totalMeal: round2(totalMeal),
        deposit: round2(deposit),

        normalMealCost: round2(normalMealCost),
        partyCost: round2(partyCost),

        eggQuantity: round2(eggQuantity),
        eggCost,

        memberCost: round2(memberCost),
        balance,

        status: balance > 0 ? "Received" : balance < 0 ? "Payable" : "Settled",
      };
    });

    // ------------------------------------------------------------
    // 6. Response
    // ------------------------------------------------------------
    const totalDeposit = [...depositMap.values()].reduce(
      (sum, value) => sum + value,
      0,
    );

    return {
      // Note: sold products are removed here, but rice is not (see the notes)
      totalExpense: round2(totalExpense - totalSoldProductAmount),
      totalPartyExpense: round2(totalPartyExpense),
      totalEggCost,
      totalSoldProductAmount: round2(totalSoldProductAmount),
      totalMealCost: round2(normalExpense),
      totalRiceExpense: round2(totalRiceExpense),

      eggSummary: {
        totalEgg: round2(totalEggQuantity),
        eggRate: round2(eggRate),
        totalEggCost,
      },

      totalDeposit: round2(totalDeposit),

      grandTotalMeals: round2(grandTotalMeals),
      mealRate,

      members,

      month: getMonthName(session.month, session.year),
      year: session.year,
    };
  }
}

export const monthlyCalculationService = new MonthlyCalculationService();
