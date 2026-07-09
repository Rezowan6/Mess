import { MealSession } from "@/models/index.js";
import { Transaction } from "sequelize";
import {
  CreateMealSessionPayload,
  FindTenantMonthYear,
  MealSessionStatus,
} from "./mealSession.interface.js";

export class MealSessionRepository {
  constructor(private readonly MealSessionModel: typeof MealSession) {}

  async findByTenantMonthYear(
    payload: FindTenantMonthYear,
    transaction: Transaction | null = null,
  ) {
    return await this.MealSessionModel.findOne({
      where: {
        ...payload,
      },
      transaction: transaction ?? null,
    });
  }

  async create(
    payload: CreateMealSessionPayload,
    transaction: Transaction | null = null,
  ) {
    return await this.MealSessionModel.create(
      {
        ...payload,
      },
      { transaction: transaction ?? null },
    );
  }

  async getCurrentSession(tenantId: number) {
    return await this.MealSessionModel.findOne({
      where: {
        tenantId,
        status: MealSessionStatus.OPEN,
      },
    });
  }

  async getAllByTenant(tenantId: number) {
    return await this.MealSessionModel.findAll({
      where: {
        tenantId,
      },
      order: [
        ["year", "DESC"],
        ["month", "DESC"],
      ],
    });
  }
  async findById(id: number) {
    return await this.MealSessionModel.findByPk(id);
  }

  async closeSession(id: number, userId: number) {
    return this.MealSessionModel.update(
      {
        status: MealSessionStatus.CLOSED,
        closedBy: userId,
        closedAt: new Date(),
      },
      { where: { id } },
    );
  }
}
