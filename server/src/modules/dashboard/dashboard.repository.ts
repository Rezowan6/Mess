import { fn, literal, Op } from "sequelize";

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

   async getTodayExpense(
    tenantId: number,
    mealSessionId: number,
    date: string,
  ) {
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

   async getTodayDeposit(
    tenantId: number,
    mealSessionId: number,
    date: string,
  ) {
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
}
export const dashboardRepository = new DashboardRepository()
