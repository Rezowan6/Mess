import { BaseRepository } from "@/common/repo/base.repository.js";
import { Attributes, CreationAttributes, Transaction } from "sequelize";

import { User } from "@/models/index.js";
import { Rice } from "./rice.model.js";

class RiceRepository extends BaseRepository<Rice> {
  constructor() {
    super(Rice);
  }

  async createRice(
    data: CreationAttributes<Rice>,
    transaction?: Transaction | null,
  ): Promise<Rice> {
    return this.createWithOptions(data, {
      ...(transaction ? { transaction } : {}),
    });
  }

  async getRiceById(
    tenantId: number,
    mealSessionId: number,
    id: number,
    transaction?: Transaction | null,
  ): Promise<Rice | null> {
    return this.findOneWithOptions({
      where: {
        id,
        tenantId,
        mealSessionId,
      },
      ...(transaction ? { transaction } : {}),
    });
  }

  async getAllRice(tenantId: number, mealSessionId: number): Promise<Rice[]> {
    return this.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email", "avatar",],
        },
      ],
      order: [["purchaseDate", "DESC"]],
    });
  }

  async updateRice(
    tenantId: number,
    mealSessionId: number,
    id: number,
    data: Partial<Attributes<Rice>>,
    transaction?: Transaction | null,
  ): Promise<[number]> {
    return this.update(
      {
        id,
        tenantId,
        mealSessionId,
      },
      data,
      {
        ...(transaction ? { transaction } : {}),
      },
    );
  }

  async deleteRice(
    tenantId: number,
    mealSessionId: number,
    id: number,
    transaction?: Transaction | null,
  ): Promise<number> {
    return this.delete(
      {
        id,
        tenantId,
        mealSessionId,
      },
      {
        ...(transaction ? { transaction } : {}),
        force: true,
      },
    );
  }

  async getRiceSummary(
    tenantId: number,
    mealSessionId: number,
  ): Promise<{
    totalQuantity: number;
    totalAmount: number;
  }> {
    const riceRecords = await this.getAllRice(tenantId, mealSessionId);

    return {
      totalQuantity: riceRecords.reduce(
        (sum, rice) => sum + Number(rice.quantity),
        0,
      ),
      totalAmount: riceRecords.reduce(
        (sum, rice) => sum + Number(rice.totalAmount),
        0,
      ),
    };
  }

  async updatePaymentStatus(
    tenantId: number,
    mealSessionId: number,
    id: number,
    paymentStatus: Rice["paymentStatus"],
    transaction?: Transaction | null,
  ): Promise<[number]> {
    return this.updateRice(
      tenantId,
      mealSessionId,
      id,
      { paymentStatus },
      transaction,
    );
  }

  async updateWithTransaction(
    tenantId: number,
    mealSessionId: number,
    id: number,
    data: Partial<Attributes<Rice>>,
    transaction: Transaction,
  ): Promise<[number]> {
    return this.updateRice(tenantId, mealSessionId, id, data, transaction);
  }
}

export const riceRepository = new RiceRepository();
