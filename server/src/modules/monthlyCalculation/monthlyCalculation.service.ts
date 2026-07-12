import { DepositRepository } from "../deposit/deposit.repository.js";
import { ExpensesRepository } from "../expenses/expenses.repository.js";
import { MealEntryRepository } from "../mealEntry/mealEntry.repository.js";
import { IMealSessionReq } from "../mealSession/mealSession.interface.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";

export class MonthlyCalculationService {
  constructor(
    private readonly expensesRepository: ExpensesRepository,
    private readonly depositRepository: DepositRepository,
    private readonly mealEnryRepository: MealEntryRepository,
    private readonly mealSessionRepository: MealSessionRepository,
  ) {}

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
      (await this.expensesRepository.getTotalExpenseByMealSession(
        tenantId,
        mealSessionId,
      )) || 0;

    const mealSummary = await this.mealEnryRepository.getTotalMealByMealSession(
      tenantId,
      mealSessionId,
    );
    const grandTotalMeals = Number(mealSummary?.grandTotalMeals ?? 0);

    const mealRate = grandTotalMeals > 0 ? totalExpense / grandTotalMeals : 0;

    const memberMeals = await this.mealEnryRepository.getMemberSummary(
      tenantId,
      mealSessionId,
    );

    const memberDeposits =
      await this.depositRepository.getMemberDepositsByMealSession(
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

    const monthName = new Date(session.year, session.month - 1).toLocaleString(
      "default",
      {
        month: "long",
      },
    );

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
