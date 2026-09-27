import { MemberStatus } from "@/constans/index.js";
import { col, fn, literal } from "sequelize";

import { Deposit } from "../deposit/deposit.model.js";
import { MealEntry } from "../mealEntry/mealEntry.model.js";
import { TenantMembership } from "../tenantMembership/tenantMembership.model.js";

import { Egg } from "../egg/egg.model.js";
import { IMyMealSummary } from "./myProfile.interface.js";

class MyProfileRepository {
  async getMyProfileUser({
    tenantId,
    userId,
  }: {
    tenantId: number;
    userId: number;
  }) {
    return TenantMembership.findOne({
      where: {
        tenantId,
        userId,
        status: MemberStatus.ACTIVE,
      },

      include: [
        {
          association: "user",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
    });
  }

  async getMyMeals({
    tenantId,
    mealSessionId,
    userId,
  }: {
    tenantId: number;
    mealSessionId: number;
    userId: number;
  }) {
    return MealEntry.findAll({
      where: {
        tenantId,
        mealSessionId,
        userId,
      },

      attributes: ["date", "breakfast", "lunch", "dinner", "guestMeal"],

      order: [["date", "ASC"]],
    });
  }

  async getMyMealSummary({
    tenantId,
    mealSessionId,
    userId,
  }: {
    tenantId: number;
    mealSessionId: number;
    userId: number;
  }): Promise<IMyMealSummary | null> {
    return MealEntry.findOne({
      where: {
        tenantId,
        mealSessionId,
        userId,
      },

      attributes: [
        [fn("SUM", literal("breakfast")), "breakfast"],
        [fn("SUM", literal("lunch")), "lunch"],
        [fn("SUM", literal("dinner")), "dinner"],
        [
          fn("SUM", literal("breakfast + lunch + dinner + guest_meal")),
          "totalMeal",
        ],
      ],

      raw: true,
    }) as unknown as IMyMealSummary;
  }

  async getMyDepositSummary({
    tenantId,
    mealSessionId,
    memberId,
  }: {
    tenantId: number;
    mealSessionId: number;
    memberId: number;
  }) {
    return Deposit.sum("amount", {
      where: {
        tenantId,
        mealSessionId,
        memberId,
      },
    });
  }

  async getMyDeposits({
    tenantId,
    mealSessionId,
    memberId,
  }: {
    tenantId: number;
    mealSessionId: number;
    memberId: number;
  }) {
    return Deposit.findAll({
      where: {
        tenantId,
        mealSessionId,
        memberId,
      },

      attributes: ["id", "amount", "paymentMethod", "createdAt"],

      order: [["createdAt", "DESC"]],
    });
  }

  async getMyEggSummary({
    tenantId,
    mealSessionId,
    memberId,
  }: {
    tenantId: number;
    mealSessionId: number;
    memberId: number;
  }) {
    const result = await Egg.findOne({
      where: {
        tenantId,
        mealSessionId,
        memberId,
      },
      attributes: [[fn("SUM", col("quantity")), "totalEgg"]],
      raw: true,
    });

    return {
      totalEgg: Number((result as any)?.totalEgg ?? 0),
    };
  }

  async getMyEggs({
    tenantId,
    mealSessionId,
    memberId,
  }: {
    tenantId: number;
    mealSessionId: number;
    memberId: number;
  }) {
    return await Egg.findAll({
      where: {
        tenantId,
        mealSessionId,
        memberId,
      },
      order: [["eggDate", "DESC"]],
    });
  }
}

export const myProfileRepository = new MyProfileRepository();
