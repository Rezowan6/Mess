import { BaseRepository } from "@/common/repo/base.repository.js";
import { Attributes, CreationAttributes, Transaction } from "sequelize";

import { RicePayment } from "./ricePayment.model.js";

class RicePaymentRepository extends BaseRepository<RicePayment> {
  constructor() {
    super(RicePayment);
  }

  async createRicePayment(
    data: CreationAttributes<RicePayment>,
    transaction?: Transaction | null,
  ): Promise<RicePayment> {
    return this.createWithOptions(data, {
      ...(transaction ? { transaction } : {}),
    });
  }

  async getRicePaymentById(
    tenantId: number,
    mealSessionId: number,
    riceId: number,
    id: number,
  ): Promise<RicePayment | null> {
    return this.findOne({
      id,
      tenantId,
      mealSessionId,
      riceId,
    });
  }

  async getAllRicePayments(
    tenantId: number,
    mealSessionId: number,
    riceId: number,
  ): Promise<RicePayment[]> {
    return this.findAll({
      where: {
        tenantId,
        mealSessionId,
        riceId,
      },
      order: [["paymentDate", "DESC"]],
    });
  }

  async updateRicePayment(
    tenantId: number,
    mealSessionId: number,
    riceId: number,
    id: number,
    data: Partial<Attributes<RicePayment>>,
    transaction?: Transaction | null,
  ): Promise<[number]> {
    return this.update(
      {
        id,
        tenantId,
        mealSessionId,
        riceId,
      },
      data,
      {
        ...(transaction ? { transaction } : {}),
      },
    );
  }

  async deleteRicePayment(
    tenantId: number,
    mealSessionId: number,
    riceId: number,
    id: number,
    transaction?: Transaction | null,
  ): Promise<number> {
    return this.delete(
      {
        id,
        tenantId,
        mealSessionId,
        riceId,
      },
      {
        ...(transaction ? { transaction } : {}),
        force: true,
      },
    );
  }

  async getTotalPaid(
    tenantId: number,
    mealSessionId: number,
    riceId: number,
    transaction?: Transaction | null,
  ): Promise<number> {
    const totalPaid = await this.sum("amount", {
      where: {
        tenantId,
        mealSessionId,
        riceId,
      },
      ...(transaction ? { transaction } : {}),
    });

    return Number(totalPaid ?? 0);
  }

  async updateWithTransaction(
    tenantId: number,
    mealSessionId: number,
    riceId: number,
    id: number,
    data: Partial<Attributes<RicePayment>>,
    transaction: Transaction,
  ): Promise<[number]> {
    return this.updateRicePayment(
      tenantId,
      mealSessionId,
      riceId,
      id,
      data,
      transaction,
    );
  }
}

export const ricePaymentRepository = new RicePaymentRepository();
