import { Mealsession } from "@/models/index.js";
import { Transaction } from "sequelize";
import {
  CreateMealSessionPayload,
  FindTenantMonthYear,
} from "./mealSession.interface.js";

export class MealSessionRepository {
  static async findByTenantMonthYear(
    payload: FindTenantMonthYear,
    transaction: Transaction | null = null,
  ) {
    return await Mealsession.findOne({
      where: {
        ...payload,
      },
      transaction: transaction ?? null,
    });
  }

  static async create(
    payload: CreateMealSessionPayload,
    transaction: Transaction | null = null,
  ) {
    return await Mealsession.create(
      {
        ...payload,
      },
      { transaction: transaction ?? null },
    );
  }
}
