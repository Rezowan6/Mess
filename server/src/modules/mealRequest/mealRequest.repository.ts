import { MealRequest } from "@/models/index.js";
import { Transaction } from "sequelize";
import {
  CreateMealRequestDto,
  MealRequestStatus,
  UpdateMealRequestDto,
} from "./mealRequest.interface.js";

export class MealRequestRepository {
  constructor(private readonly mealRequestModel: typeof MealRequest) {}

  async createMealRequest(
    mealRequestData: CreateMealRequestDto,
  ): Promise<MealRequest> {
    return this.mealRequestModel.create(mealRequestData);
  }

  async getMealRequestById(
    id: number,
    transaction: Transaction | null = null,
  ): Promise<MealRequest | null> {
    return this.mealRequestModel.findByPk(id, {
      transaction: transaction ?? null,
    });
  }

  async getPendingRequestsByTenantId(tenantId: number): Promise<MealRequest[]> {
    return this.mealRequestModel.findAll({
      where: { tenantId, status: MealRequestStatus.PENDING },
      attributes: [
        "id",
        "date",
        "breakfast",
        "lunch",
        "dinner",
        "status",
        "createdAt",
      ],
      include: [
        {
          association: "requester",
          attributes: ["id", "name", "email", "avatar"],
        },
        {
          association: "mealSession",
          attributes: ["id", "month", "year", "status"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  }
  async getMealRequestsByUserId(
    userId: number,
    tenantId: number,
  ): Promise<MealRequest[]> {
    return this.mealRequestModel.findAll({ where: { userId, tenantId } });
  }
  async getMyMealRequests({
    tenantId,
    userId,
  }: {
    tenantId: number;
    userId: number;
  }): Promise<MealRequest[]> {
    return this.mealRequestModel.findAll({
      where: { userId, tenantId },
      attributes: [
        "id",
        "date",
        "breakfast",
        "lunch",
        "dinner",
        "status",
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

  async getMealRequestsByDateAndTenant(
    date: Date,
    tenantId: number,
  ): Promise<MealRequest[]> {
    return this.mealRequestModel.findAll({ where: { date, tenantId } });
  }

  async getByTenantMealSessionUserIdAndDate(payload: {
    tenantId: number;
    mealSessionId: number;
    userId: number;
    date: Date;
  }): Promise<MealRequest | null> {
    const { tenantId, mealSessionId, userId, date } = payload;
    return this.mealRequestModel.findOne({
      where: {
        tenantId,
        mealSessionId,
        userId,
        date,
      },
    });
  }

  async updateMealRequest(
    id: number,
    updateData: UpdateMealRequestDto,
    transaction: Transaction | null = null,
  ): Promise<[affectedCount: number]> {
    return await this.mealRequestModel.update(updateData, {
      where: { id },
      transaction: transaction ?? null,
    });
  }

  async deleteMealRequest(id: number): Promise<number> {
    return this.mealRequestModel.destroy({ where: { id } });
  }
}
