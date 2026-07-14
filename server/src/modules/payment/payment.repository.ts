import { Op } from "sequelize";

import { BaseRepository } from "@/common/base.repository.js";

import { Payment } from "./payment.model.js";

import { PaymentStatus } from "./payment.interface.js";

class PaymentRepository extends BaseRepository<Payment> {
  constructor() {
    super(Payment);
  }

  async findByTransactionId(transactionId: string): Promise<Payment | null> {
    return this.findOne({
      transactionId,
    });
  }

  async findBySubscription(subscriptionId: number): Promise<Payment[]> {
    return this.findAll({
      where: {
        subscriptionId,
      },
      order: [["createdAt", "DESC"]],
    });
  }

  async findByTenant(tenantId: number): Promise<Payment[]> {
    return this.findAll({
      where: {
        tenantId,
      },
      order: [["createdAt", "DESC"]],
    });
  }

  async findPendingBySubscription(
    subscriptionId: number,
  ): Promise<Payment | null> {
    return this.findOne({
      subscriptionId,
      status: PaymentStatus.PENDING,
    });
  }

  async findSuccessfulBySubscription(
    subscriptionId: number,
  ): Promise<Payment | null> {
    return this.findOne({
      subscriptionId,
      status: PaymentStatus.SUCCESS,
    });
  }

  async findPendingPayments(): Promise<Payment[]> {
    return this.findAll({
      where: {
        status: PaymentStatus.PENDING,
      },
      order: [["createdAt", "ASC"]],
    });
  }

  async findProcessingPayments(): Promise<Payment[]> {
    return this.findAll({
      where: {
        status: PaymentStatus.PROCESSING,
      },
      order: [["createdAt", "ASC"]],
    });
  }

  async markAsProcessing(id: number): Promise<[number]> {
    return this.update(
      {
        id,
      },
      {
        status: PaymentStatus.PROCESSING,
      },
    );
  }

  async markAsSuccess(id: number, transactionId: string): Promise<[number]> {
    return this.update(
      {
        id,
      },
      {
        status: PaymentStatus.SUCCESS,
        transactionId,
        paidAt: new Date(),
      },
    );
  }

  async markAsFailed(id: number): Promise<[number]> {
    return this.update(
      {
        id,
      },
      {
        status: PaymentStatus.FAILED,
      },
    );
  }

  async markAsCancelled(id: number): Promise<[number]> {
    return this.update(
      {
        id,
      },
      {
        status: PaymentStatus.CANCELLED,
      },
    );
  }

  async findExpiredPendingPayments(beforeDate: Date): Promise<Payment[]> {
    return this.findAll({
      where: {
        status: PaymentStatus.PENDING,
        createdAt: {
          [Op.lt]: beforeDate,
        },
      }
    });
  }
}

export const paymentRepository = new PaymentRepository();
