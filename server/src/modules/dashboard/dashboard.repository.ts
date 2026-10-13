import { col, fn, literal } from "sequelize";

import {
  Deposit,
  Expenses,
  MealEntry,
  TenantMembership,
} from "@/models/index.js";

class DashboardRepository {
  async getTotalMembers(tenantId: number) {
    return TenantMembership.count({
      where: {
        tenantId,
      },
    });
  }

  async getTotalMeals(tenantId: number, mealSessionId: number) {
    const mealEntries = await MealEntry.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
      attributes: ["breakfast", "lunch", "dinner", "guestMeal"],
      raw: true,
    });

    return mealEntries.reduce(
      (total, meal) =>
        total +
        Number(meal.breakfast ?? 0) +
        Number(meal.lunch ?? 0) +
        Number(meal.dinner ?? 0) +
        Number(meal.guestMeal ?? 0),
      0,
    );
  }

  async getTotalExpense(tenantId: number, mealSessionId: number) {
    return (
      (await Expenses.sum("amount", {
        where: {
          tenantId,
          mealSessionId,
        },
      })) || 0
    );
  }

  async getTotalDeposit(tenantId: number, mealSessionId: number) {
    return (
      (await Deposit.sum("amount", {
        where: {
          tenantId,
          mealSessionId,
        },
      })) || 0
    );
  }

  async getMealTrend(tenantId: number, mealSessionId: number) {
    return MealEntry.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
      attributes: [
        [literal("DATE(CONVERT_TZ(`date`, '+00:00', '+06:00'))"), "date"],
        [
          fn("SUM", literal("breakfast + lunch + dinner + guest_meal")),
          "meals",
        ],
      ],
      group: [fn("DATE", fn("CONVERT_TZ", col("date"), "+00:00", "+06:00"))],
      order: [[literal("DATE(CONVERT_TZ(`date`, '+00:00', '+06:00'))"), "ASC"]],
      raw: true,
    });
  }
}
export const dashboardRepository = new DashboardRepository();
