import { MemberStatus } from "@/constans/index.js";
import { Deposit, Egg, Expenses, MealEntry } from "@/models/index.js";
import { col, fn, literal } from "sequelize";
import { IMealSummary } from "../mealEntry/mealEntry.interface.js";
import { membershipRepository } from "../tenantMembership/tenantMembership.repository.js";

class MonthlyCalculationRepository {
  async getActiveMembers(tenantId: number) {
    return await membershipRepository.findAll({
      where: {
        tenantId,
        status: MemberStatus.ACTIVE,
      },

      attributes: ["userId"],

      include: [
        {
          association: "user",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
    });
  }
  async getTotalExpense(
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

  async getTotalMeal(
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

  async getMemberMeals(tenantId: number, mealSessionId: number) {
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

  async getMemberDeposits(tenantId: number, mealSessionId: number) {
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

  async getMemberEggs(tenantId: number, mealSessionId: number) {
    return Egg.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
      attributes: ["memberId", [fn("SUM", col("quantity")), "totalEgg"]],
      group: ["memberId"],
      raw: true,
    });
  }

  async getTotalEggQuantity(
    tenantId: number,
    mealSessionId: number,
  ): Promise<number> {
    const result = await Egg.findOne({
      where: {
        tenantId,
        mealSessionId,
      },
      attributes: [[fn("SUM", col("quantity")), "totalEgg"]],
      raw: true,
    });

    return Number((result as any)?.totalEgg ?? 0);
  }
}

export const monthlyCalculationRepository = new MonthlyCalculationRepository();
