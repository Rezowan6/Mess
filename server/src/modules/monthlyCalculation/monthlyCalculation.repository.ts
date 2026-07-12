import { Deposit, Expenses, MealEntry } from "@/models/index.js";
import { col, fn, literal } from "sequelize";
import { IMealSummary } from "../mealEntry/mealEntry.interface.js";

export class MonthlyCalculationRepository {
  static async getTotalExpense(
    tenantId: number,
    mealSessionId: number,
  ): Promise<number> {
    return (
      (await Expenses.sum("amount", {
        where: {
          tenantId,
          mealSessionId,
        },
      })) || 0
    );
  }

  static async getTotalMeal(
    tenantId: number,
    mealSessionId: number,
  ): Promise<IMealSummary | null> {
    const result = await MealEntry.findOne({
      where: {
        tenantId,
        mealSessionId,
      },

      attributes: [
        [fn("SUM", literal("breakfast + lunch + dinner")), "totalMeals"],
        [
          fn("SUM", literal("breakfast + lunch + dinner + guest_meal")),
          "grandTotalMeals",
        ],
        [fn("SUM", col("guest_meal")), "totalGuestMeals"],
        [fn("COUNT", literal("DISTINCT user_id")), "memberCount"],
      ],
      raw: true,
    });

    return result as IMealSummary | null;
  }

  static async getMemberMeals(tenantId: number, mealSessionId: number) {
    return await MealEntry.findAll({
      where: { tenantId, mealSessionId },
      attributes: [
        "userId",
        [fn("SUM", col("breakfast")), "totalBreakfast"],
        [fn("SUM", col("lunch")), "totalLunch"],
        [fn("SUM", col("dinner")), "totalDinner"],
        [fn("SUM", col("guest_meal")), "totalGuestMeal"],
        [
          fn("SUM", literal("breakfast + lunch + dinner + guest_meal")),
          "totalMeal",
        ],
      ],
      include: [
        { association: "user", attributes: ["id", "name", "email", "avatar"] },
      ],
      group: ["userId", "user.id"],
    });
  }

  static async getMemberDeposits(
    tenantId: number,
    mealSessionId: number,
  ) {
    return Deposit.findAll({
      where: {
        tenantId,
        mealSessionId,
      },

      attributes: ["memberId", [fn("SUM", col("amount")), "totalDeposit"]],

      group: ["memberId"],

      raw: true,
    });
  }
}
