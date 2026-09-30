import { BaseRepository } from "@/common/repo/base.repository.js";
import { Attributes, col, CreationAttributes, fn, Op, Transaction } from "sequelize";

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

    /**
   * Returns total paid amount for many rice purchases in one query.
   * Purchases without any payment are not present in the map (treat as 0).
   */
  async getTotalPaidByRiceIds(
    tenantId: number,
    mealSessionId: number,
    riceIds: number[],
    transaction?: Transaction | null,
  ): Promise<Map<number, number>> {
    if (riceIds.length === 0) {
      return new Map();
    }

    const rows = (await this.findAll({
      attributes: ["riceId", [fn("SUM", col("amount")), "totalPaid"]],
      where: {
        tenantId,
        mealSessionId,
        riceId: { [Op.in]: riceIds },
      },
      group: ["riceId"],
      raw: true,
      ...(transaction ? { transaction } : {}),
    })) as unknown as Array<{ riceId: number; totalPaid: string | null }>;

    return new Map(rows.map((row) => [row.riceId, Number(row.totalPaid ?? 0)]));
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
