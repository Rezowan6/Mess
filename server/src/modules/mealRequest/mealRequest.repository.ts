import { MealRequest } from "@/models/index.js";
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

  async getMealRequestById(id: number): Promise<MealRequest | null> {
    return this.mealRequestModel.findByPk(id);
  }

  async getPendingRequestsByTenantId(tenantId: number): Promise<MealRequest[]> {
    return this.mealRequestModel.findAll({
      where: { tenantId, status: MealRequestStatus.PENDING },
    });
  }
  async getMealRequestsByUserId(
    userId: number,
    tenantId: number,
  ): Promise<MealRequest[]> {
    return this.mealRequestModel.findAll({ where: { userId, tenantId } });
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
  ): Promise<[affectedCount: number]> {
    return await this.mealRequestModel.update(updateData, {
      where: { id },
    });
  }

  async deleteMealRequest(id: number): Promise<number> {
    return this.mealRequestModel.destroy({ where: { id } });
  }
}
