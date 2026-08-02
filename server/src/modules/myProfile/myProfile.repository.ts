import { MemberStatus } from "@/constans/index.js";
import { fn, literal } from "sequelize";

import { Deposit } from "../deposit/deposit.model.js";
import { MealEntry } from "../mealEntry/mealEntry.model.js";
import { TenantMembership } from "../tenantMembership/tenantMembership.model.js";

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
}

export const myProfileRepository = new MyProfileRepository();
