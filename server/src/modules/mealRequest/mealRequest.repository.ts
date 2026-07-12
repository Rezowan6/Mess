import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { MealRequest } from "@/models/index.js";
import { Op, Transaction } from "sequelize";
import {
  ICreateMealRequestDto,
  MealRequestStatus,
  UpdateMealRequestDto,
} from "./mealRequest.interface.js";

export class MealRequestRepository {
  constructor(private readonly mealRequestModel: typeof MealRequest) {}

  async createMealRequest(
    mealRequestData: ICreateMealRequestDto,
  ): Promise<MealRequest> {
    return this.mealRequestModel.create(mealRequestData);
  }

  async getMealRequestById(
    id: number,
    mealSessionId: number,
    transaction: Transaction | null = null,
  ): Promise<MealRequest | null> {
    return this.mealRequestModel.findOne({
      where: { id, mealSessionId },
      transaction: transaction ?? null,
    });
  }

  async getPendingRequestsByTenantId(
    tenantId: number,
    mealSessionId: number,
  ): Promise<MealRequest[]> {
    return await this.mealRequestModel.findAll({
      where: { tenantId, mealSessionId, status: MealRequestStatus.PENDING },
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

  async getPendingRequestsByDate(
    { tenantId, date }: { tenantId: number; date: Date },
    transaction: Transaction | null = null,
  ) {
    const { start, end } = getRangeTime(date);

    return await this.mealRequestModel.findAll({
      where: {
        tenantId,
        date: {
          [Op.between]: [start, end],
        },
        status: MealRequestStatus.PENDING,
      },
      transaction: transaction ?? null,
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
    mealSessionId,
  }: {
    tenantId: number;
    userId: number;
    mealSessionId: number;
  }): Promise<MealRequest[]> {
    return this.mealRequestModel.findAll({
      where: { userId, tenantId, mealSessionId, status: MealRequestStatus.PENDING },
      attributes: [
        "id",
        "date",
        "breakfast",
        "lunch",
        "dinner",
        "guest_meal",
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

    const { start, end } = getRangeTime(date);

    return this.mealRequestModel.findOne({
      where: {
        tenantId,
        mealSessionId,
        userId,
        date: { [Op.between]: [start, end] },
      },
    });
  }

  async updateMealRequest(
    id: number,
    mealSessionId: number,
    updateData: UpdateMealRequestDto,
    transaction: Transaction | null = null,
  ): Promise<[affectedCount: number]> {
    return await this.mealRequestModel.update(updateData, {
      where: { id, mealSessionId },
      transaction: transaction ?? null,
    });
  }

  async bulkApproveRequests(
    requestIds: number[],
    managerId: number,
    transaction: Transaction | null = null,
  ) {
    return this.mealRequestModel.update(
      {
        status: MealRequestStatus.APPROVED,
        approvedBy: managerId,
        approvedAt: new Date(),
      },
      {
        where: {
          id: {
            [Op.in]: requestIds,
          },
        },
        transaction: transaction ?? null,
      },
    );
  }

  async deleteMealRequest(id: number): Promise<number> {
    return this.mealRequestModel.destroy({ where: { id } });
  }
}
