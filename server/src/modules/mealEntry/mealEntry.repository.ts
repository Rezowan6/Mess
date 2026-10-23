import { BaseRepository } from "@/common/repo/base.repository.js";
import { buildSearchCondition } from "@/common/utils/search.util.js";
import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { MealEntry } from "@/models/index.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { getSearchQuery } from "@/utils/string.util.js";
import { Op, Transaction, col, fn, literal } from "sequelize";
import { ICreateMealEntryDto } from "./mealEntry.interface.js";

export class MealEntryRepository extends BaseRepository<MealEntry> {
  constructor() {
    super(MealEntry);
  }

  async getAllMembersMeals({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    return await this.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
      include: [
        {
          association: "user",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],

      order: [["date", "DESC"]],
    });
  }

  async existsByRequest({
    tenantId,
    mealRequestId,
  }: {
    tenantId: number;
    mealRequestId: number;
  }) {
    return this.findOne({
      tenantId,
      mealRequestId,
    });
  }

  async createMealEntry(
    mealEntryData: ICreateMealEntryDto,
    transaction: Transaction | null = null,
  ) {
    return await this.createWithOptions(mealEntryData, {
      transaction: transaction ?? null,
    });
  }

  async bulkCreateMealEntries(
    data: any[],
    transaction: Transaction | null = null,
  ) {
    return this.bulkCreate(data, {
      transaction: transaction ?? null,
    });
  }

  async getMyMeal({
    tenantId,
    userId,
    mealSessionId,
  }: {
    tenantId: number;
    userId: number;
    mealSessionId: number;
  }): Promise<{
    meals: MealEntry[];
    totalMeal: number;
  }> {
    const meals = await this.findAll({
      where: {
        userId,
        mealSessionId,
        tenantId,
      },
      attributes: [
        "id",
        "date",
        "breakfast",
        "lunch",
        "dinner",
        "guest_meal",
        "createdAt",
      ],
      include: [
        {
          association: "mealSession",
          attributes: ["id", "month", "year", "status"],
        },
      ],
      order: [["date", "DESC"]],
    });

    const totalMeal = meals.reduce((total, meal) => {
      return (
        total +
        Number(meal.breakfast || 0) +
        Number(meal.lunch || 0) +
        Number(meal.dinner || 0)
      );
    }, 0);

    return {
      meals,
      totalMeal,
    };
  }

  async getMemberMealSummary({
    tenantId,
    mealSessionId,
    query,
  }: {
    tenantId: number;
    mealSessionId: number;
    query: IPaginationQuery;
  }) {
    const search = getSearchQuery(query);

    const userInclude = {
      association: "user",
      attributes: ["id", "name", "email", "avatar"],
      required: Boolean(search),
      where: buildSearchCondition(["name", "email"], search),
    };

    return this.paginateGrouped(
      {
        where: {
          tenantId,
          mealSessionId,
        },
        attributes: [
          "userId",
          [fn("SUM", col("breakfast")), "totalBreakfast"],
          [fn("SUM", col("lunch")), "totalLunch"],
          [fn("SUM", col("dinner")), "totalDinner"],
          [fn("SUM", col("guest_meal")), "totalGuestMeal"],
          [fn("SUM", literal("breakfast + lunch + dinner")), "totalMeals"],
          [
            fn("SUM", literal("breakfast + lunch + dinner + guest_meal")),
            "grandTotalMeals",
          ],
        ],
        include: [userInclude],
        group: ["userId", "user.id", "user.name", "user.email", "user.avatar"],
        order: [["userId", "ASC"]],
      },
      query,
    );
  }

  async todayMealEntries(
    { tenantId, date }: { tenantId: number; date: Date },
    transaction: Transaction | null = null,
  ) {
    const { start, end } = getRangeTime(date);
    return await this.findAll({
      where: {
        tenantId,
        date: {
          [Op.between]: [start, end],
        },
      },
      attributes: [
        "id",
        "date",
        "breakfast",
        "lunch",
        "dinner",
        "guestMeal",
        "createdAt",
      ],
      include: [
        {
          association: "user",
          attributes: ["id", "name", "avatar", "email"],
        },
        {
          association: "mealSession",
          attributes: ["id", "month", "year", "status"],
        },
        {
          association: "mealRequest",
          attributes: ["id", "status"],
        },
      ],
      order: [["createdAt", "ASC"]],
      transaction: transaction ?? null,
    });
  }

  async getMemberSummary(tenantId: number, mealSessionId: number) {
    return await this.findAll({
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
}

export const mealEntryRepository = new MealEntryRepository();
