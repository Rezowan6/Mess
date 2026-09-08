import { col, fn, literal, Op } from "sequelize";

import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import {
  Deposit,
  Expenses,
  MealEntry,
  MealRequest,
  TenantMembership,
} from "@/models/index.js";
import { MealRequestStatus } from "../mealRequest/mealRequest.interface.js";
import { ITodayToalMeals } from "./dashboard.interface.js";

class DashboardRepository {
  async getTotalMembers(tenantId: number) {
    return TenantMembership.count({
      where: {
        tenantId,
      },
    });
  }

  async getTodayExpense(tenantId: number, mealSessionId: number, date: string) {
    const { start, end } = getRangeTime(date);
    return (
      (await Expenses.sum("amount", {
        where: {
          tenantId,
          mealSessionId,
          expenseDate: { [Op.between]: [start, end] },
        },
      })) || 0
    );
  }

  async getTodayDeposit(tenantId: number, mealSessionId: number, date: string) {
    const { start, end } = getRangeTime(date);
    return (
      (await Deposit.sum("amount", {
        where: {
          tenantId,
          mealSessionId,
          depositDate: { [Op.between]: [start, end] },
        },
      })) || 0
    );
  }

  async getTodayMeals(
    tenantId: number,
    mealSessionId: number,
    date: string,
  ): Promise<ITodayToalMeals | null> {
    const { start, end } = getRangeTime(date);
    const result = await MealEntry.findOne({
      where: {
        tenantId,
        mealSessionId,
        date: { [Op.between]: [start, end] },
      },

      attributes: [
        [
          fn("SUM", literal("breakfast + lunch + dinner + guest_meal")),
          "totalMeals",
        ],
      ],

      raw: true,
    });
    return result as ITodayToalMeals | null;
  }

  async getTodayPendingMealReq(
    tenantId: number,
    mealSessionId: number,
    date: string,
  ) {
    const { start, end } = getRangeTime(date);
    return await MealRequest.findAll({
      where: {
        tenantId,
        mealSessionId,
        date: { [Op.between]: [start, end] },
        status: MealRequestStatus.PENDING,
      },
      attributes: [
        "id",
        "breakfast",
        "lunch",
        "dinner",
        "guest_meal",
        "status",
      ],
      include: [
        {
          association: "requester",
          attributes: ["id", "name", "avatar"],
        },
      ],
    });
  }

  async getTodayPendingMealReqCount(
    tenantId: number,
    mealSessionId: number,
    date: string,
  ) {
    const { start, end } = getRangeTime(date);
    return await MealRequest.count({
      where: {
        tenantId,
        mealSessionId,
        date: { [Op.between]: [start, end] },
        status: MealRequestStatus.PENDING,
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
        [fn("DATE", col("date")), "date"],
        [
          fn("SUM", literal("breakfast + lunch + dinner + guest_meal")),
          "meals",
        ],
      ],
      group: [fn("DATE", col("date"))],
      order: [[fn("DATE", col("date")), "ASC"]],
      raw: true,
    });
  }
}
export const dashboardRepository = new DashboardRepository();
