import { col, fn } from "sequelize";
import {Expenses, Deposit, MealEntry, User} from "@/models/index.js";

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
  ): Promise<number> {
    return (
      (await MealEntry.sum("totalMeal", {
        where: {
          tenantId,
          mealSessionId,
        },
      })) || 0
    );
  }

  static async getMemberMeals(tenantId: number, mealSessionId: number) {
    return MealEntry.findAll({
      attributes: ["userId", [fn("SUM", col("totalMeal")), "totalMeal"]],
      where: {
        tenantId,
        mealSessionId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
      group: ["userId"],
    });
  }

  static async getMemberDeposit(
    tenantId: number,
    mealSessionId: number,
    memberId: number,
  ): Promise<number> {
    return (
      (await Deposit.sum("amount", {
        where: {
          tenantId,
          mealSessionId,
          memberId,
        },
      })) || 0
    );
  }
}
