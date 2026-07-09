import { MealEntry } from "@/models/index.js";
import { Transaction } from "sequelize";
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
}
