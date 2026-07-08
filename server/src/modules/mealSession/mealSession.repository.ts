import { MealSession } from "@/models/index.js";
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
    return await MealSession.findOne({
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
    return await MealSession.create(
      {
        ...payload,
      },
      { transaction: transaction ?? null },
    );
  }

  static async findCurrentSession(tenantId: number) {
    return await MealSession.findOne({
      where: {
        tenantId,
        status: MealSessionStatus.OPEN,
      },
    });
  }

  static async findAllByTenant(tenantId: number) {
    return await MealSession.findAll({
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
    return await MealSession.findByPk(id);
  }

  static async closeSession(id: number, userId: number) {
    return MealSession.update(
      {
        status: MealSessionStatus.CLOSED,
        closedBy: userId,
        closedAt: new Date(),
      },
      { where: { id } },
    );
  }
}
