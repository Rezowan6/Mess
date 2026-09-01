import { BaseRepository } from "@/common/repo/base.repository.js";
import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { MealEntry } from "@/models/index.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { Op, Transaction, col, fn, literal } from "sequelize";
import { ICreateMealEntryDto, IMealSummary } from "./mealEntry.interface.js";

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
  }: {
    tenantId: number;
    userId: number;
  }): Promise<MealEntry[]> {
    return await this.findAll({
      where: { userId, tenantId },
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
    const userInclude = {
      association: "user",

      attributes: ["id", "name", "email", "avatar"],

      required: !!query.search,

      ...(query.search && {
        where: {
          name: {
            [Op.like]: `%${query.search}%`,
          },
        },
      }),
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

        order: [[literal("grandTotalMeals"), "DESC"]],
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

  async getDailySummary(tenantId: number, date: Date) {
    const { start, end } = getRangeTime(date);

    const summary = await this.findOneWithOptions({
      where: {
        tenantId,
        date: {
          [Op.between]: [start, end],
        },
      },

      attributes: [
        [fn("SUM", col("breakfast")), "totalBreakfast"],
        [fn("SUM", col("lunch")), "totalLunch"],
        [fn("SUM", col("dinner")), "totalDinner"],
        [fn("SUM", col("guest_meal")), "totalGuestMeal"],

        [
          fn("SUM", literal("breakfast + lunch + dinner + guest_meal")),
          "totalMeal",
        ],

        [fn("COUNT", literal("DISTINCT user_id")), "memberCount"],
      ],

      raw: true,
    });

    return summary;
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

  async getTotalMealByMealSession(
    tenantId: number,
    mealSessionId: number,
  ): Promise<IMealSummary | null> {
    const result = await this.findOneWithOptions({
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
}

export const mealEntryRepository = new MealEntryRepository();
