import { Mealsession } from "@/models/index.js";
import { Transaction } from "sequelize";
import {
  CreateMealSessionPayload,
  FindTenantMonthYear,
  MealSessionStatus,
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

  static async findCurrentSession(tenantId: number) {
    return await Mealsession.findOne({
      where: {
        tenantId,
        status: MealSessionStatus.OPEN,
      },
    });
  }

  static async findAllByTenant(tenantId: number) {
    return await Mealsession.findAll({
      where: {
        tenantId,
      },
      order: [
        ["year", "DESC"],
        ["month", "DESC"],
      ],
    });
  }
  static async findById(id: number) {
    return await Mealsession.findByPk(id);
  }

  static async closeSession(id: number, userId: number) {
    return Mealsession.update(
      {
        status: MealSessionStatus.CLOSED,
        closedBy: userId,
        closedAt: new Date(),
      },
      { where: { id } },
    );
  }
}
