import { BaseRepository } from "@/common/repo/base.repository.js";
import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { MealRequest } from "@/models/index.js";
import { ApiError } from "@/utils/ApiError.js";
import { Op, Sequelize, Transaction } from "sequelize";
import {
  MealRequestStatus,
  UpdateMealRequestDto,
} from "./mealRequest.interface.js";

class MealRequestRepository extends BaseRepository<MealRequest> {
  constructor() {
    super(MealRequest);
  }
  async getExistingRequestsInRange(
    {
      tenantId,
      mealSessionId,
      userId,
      fromDate,
      toDate,
    }: {
      tenantId: number;
      mealSessionId: number;
      userId: number;
      fromDate: Date;
      toDate: Date;
    },
    transaction: Transaction | null = null,
  ): Promise<MealRequest[]> {
    const startDate = new Date(fromDate);

    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(toDate);

    endDate.setHours(23, 59, 59, 999);

    return this.findAllWithOptions({
      where: {
        tenantId,
        mealSessionId,
        userId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },

      transaction: transaction ?? null,
    });
  }

  async findTodayRequest({
    tenantId,
    userId,
    date,
  }: {
    tenantId: number;
    userId: number;
    date: Date;
  }): Promise<MealRequest | null> {
    const { start, end } = getRangeTime(date);

    return this.findOneWithOptions({
      where: {
        tenantId,
        userId,
        date: {
          [Op.between]: [start, end],
        },
      },
    });
  }

  async existsByDate({
    tenantId,
    mealSessionId,
    userId,
    date,
  }: {
    tenantId: number;
    mealSessionId: number;
    userId: number;
    date: Date;
  }) {
    const result = await MealRequest.findOne({
      where: {
        tenantId,
        mealSessionId,
        userId,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("DATE", Sequelize.col("date")),
            "=",
            date.toISOString().slice(0, 10),
          ),
        ],
      },
    });

    return !!result;
  }

  async hasPendingRequests(
    tenantId: number,
    mealSessionId: number,
  ): Promise<boolean> {
    const request = await this.findOne({
      tenantId,
      mealSessionId,
      status: MealRequestStatus.PENDING,
    });

    return Boolean(request);
  }

  async findByDate({
    tenantId,
    userId,
    date,
    mealSessionId,
  }: {
    tenantId: number;
    userId: number;
    date: Date;
    mealSessionId?: number;
  }): Promise<MealRequest | null> {
    const { start, end } = getRangeTime(date);

    return await this.findOneWithOptions({
      where: {
        tenantId,
        userId,

        ...(mealSessionId !== undefined && {
          mealSessionId,
        }),

        date: {
          [Op.between]: [start, end],
        },
      },
    });
  }

  async getPendingRequestsByTenantId(
    tenantId: number,
    mealSessionId: number,
  ): Promise<MealRequest[]> {
    return await this.findAll({
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

  async getMyPendingReq(
    tenantId: number,
    mealSessionId: number,
    userId: number,
  ): Promise<MealRequest[]> {
    return await this.findAll({
      where: {
        tenantId,
        mealSessionId,
        userId,
        status: MealRequestStatus.PENDING,
      },
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

  async getPendingRequestsByDateRange({
    tenantId,
    mealSessionId,
    fromDate,
    toDate,
  }: {
    tenantId: number;
    mealSessionId: number;
    fromDate: Date;
    toDate: Date;
  }): Promise<MealRequest[]> {
    const startDate = new Date(fromDate);

    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(toDate);

    endDate.setHours(23, 59, 59, 999);
    return this.findAll({
      where: {
        tenantId,
        mealSessionId,

        status: MealRequestStatus.PENDING,

        date: {
          [Op.between]: [startDate, endDate],
        },
      },

      order: [["date", "ASC"]],
    });
  }

  // done
  async getPendingRequestsByDate(
    { tenantId, date }: { tenantId: number; date: Date },
    transaction: Transaction | null = null,
  ): Promise<any> {
    const { start, end } = getRangeTime(date);

    return (await this.findAllWithOptions({
      where: {
        tenantId,
        date: {
          [Op.between]: [start, end],
        },
        status: MealRequestStatus.PENDING,
      },
      include: [
        {
          association: "requester",
          attributes: ["id", "name", "avatar"],
          required: true,
        },
      ],
      transaction: transaction ?? null,
    })) as unknown as any[];
  }

  async updateMealRequest(
    id: number,
    mealSessionId: number,
    updateData: UpdateMealRequestDto,
    transaction: Transaction | null = null,
  ): Promise<[affectedCount: number]> {
    return await this.update({ id, mealSessionId }, updateData, {
      transaction: transaction ?? null,
    });
  }

  async findOneByDate({
    tenantId,
    userId,
    date,
    transaction = null,
  }: {
    tenantId: number;
    userId: number;
    date: Date;
    transaction?: Transaction | null;
  }) {
    const { start, end } = getRangeTime(date);

    return await this.findOneWithOptions({
      where: {
        tenantId,
        userId,
        date: {
          [Op.between]: [start, end],
        },
      },
      transaction,
    });
  }
  async findOneByDateAndId({
    id,
    tenantId,
    userId,
    date,
  }: {
    id: number;
    tenantId: number;
    userId: number;
    date: Date;
    transaction?: Transaction | null;
  }) {
    const { start, end } = getRangeTime(date);

    return await this.findOneWithOptions({
      where: {
        id,
        tenantId,
        userId,
        date: {
          [Op.between]: [start, end],
        },
      },
    });
  }

  async updateById(
    id: number,
    data: any,
    transaction: Transaction | null = null,
  ) {
    const [affectedRows] = await this.update({ id }, data, {
      transaction: transaction ?? null,
    });

    if (!affectedRows) {
      throw new ApiError(404, "Meal request not found.");
    }

    return await this.findByIdWithOptions(id, { transaction });
  }

  async bulkApproveRequests(
    requestIds: number[],
    managerId: number,
    transaction: Transaction | null = null,
  ) {
    return this.update(
      {
        id: {
          [Op.in]: requestIds,
        },
      },
      {
        status: MealRequestStatus.APPROVED,
        approvedBy: managerId,
        approvedAt: new Date(),
      },
      { transaction },
    );
  }
}

export const mealRequestRepository = new MealRequestRepository();
