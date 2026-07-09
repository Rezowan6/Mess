import { MealEntry } from "@/models/index.js";
import { Op, Transaction } from "sequelize";
import { CreateMealEntryDto } from "./mealEntry.interface.js";

export class MealEntryRepository {
  constructor(private readonly mealEntryModel: typeof MealEntry) {}

  async createMealEntry(
    mealEntryData: CreateMealEntryDto,
    transaction: Transaction | null = null,
  ) {
    return await this.mealEntryModel.create(mealEntryData, {
      transaction: transaction ?? null,
    });
  }

  async bulkCreateMealEntries(
    data: any[],
    transaction: Transaction | null = null,
  ) {
    return this.mealEntryModel.bulkCreate(data, {
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
    return await this.mealEntryModel.findAll({
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

  async getDailyEntries(
    { tenantId, date }: { tenantId: number; date: { start: Date; end: Date } },
    transaction: Transaction | null = null,
  ) {
    return await this.mealEntryModel.findAll({
      where: {
        tenantId,
        date: {
          [Op.between]: [date.start, date.end],
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
          attributes: ["id", "name",],
        },
        {
          association: "mealSession",
          attributes: ["id", "month", "year", "status"],
        },
        {
          association: "mealRequest",
          attributes: [
            "id",
            "status",
          ],
        },
      ],
      order: [["createdAt", "ASC"]],
      transaction: transaction ?? null,
    });
  }
}
