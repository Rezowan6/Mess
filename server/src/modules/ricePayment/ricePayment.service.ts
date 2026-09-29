import sequelize from "@/configs/db.js";
import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import { Attributes } from "sequelize";

import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { riceRepository } from "../rice/rice.repository.js";
import { riceService } from "../rice/rice.service.js";
import {
  ICreateRicePaymentDto,
  IUpdateRicePaymentDto,
  RICE_PAYMENT_METHODS,
  RicePaymentMethodValue,
} from "./ricePayment.interface.js";
import { ricePaymentRepository } from "./ricePayment.repository.js";

class RicePaymentService {
  async create(data: ICreateRicePaymentDto) {
    const {
      tenantId,
      mealSessionId,
      riceId,
      createdBy,
      amount,
      paymentMethod,
      paymentDate,
      note,
    } = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const rice = await riceRepository.getRiceById(
      tenantId,
      mealSessionId,
      riceId,
    );

    if (!rice) {
      throw new ApiError(404, "Rice purchase not found.");
    }

    this.validatePaymentMethod(paymentMethod);

    const totalPaid = await ricePaymentRepository.getTotalPaid(
      tenantId,
      mealSessionId,
      riceId,
    );

    this.validatePaymentAmount({
      amount,
      totalAmount: Number(rice.totalAmount),
      totalPaid,
    });

    const transaction = await sequelize.transaction();

    try {
      const payment = await ricePaymentRepository.createRicePayment(
        {
          tenantId,
          mealSessionId,
          riceId,
          createdBy,
          amount,
          paymentMethod,
          paymentDate: paymentDate ?? new Date(),
          note: note ?? null,
        },
        transaction,
      );

      await riceService.recalculatePaymentStatus({
        tenantId,
        mealSessionId,
        id: riceId,
        transaction,
      });

      await transaction.commit();

      socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
        resource: RealtimeResource.RICE_PAYMENT,
        action: RealtimeAction.CREATED,
        tenantId,
        mealSessionId,
      });

      socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
        resource: RealtimeResource.RICE,
        action: RealtimeAction.UPDATED,
        tenantId,
        mealSessionId,
      });

      return payment;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getById({
    tenantId,
    mealSessionId,
    riceId,
    id,
  }: {
    tenantId: number;
    mealSessionId: number;
    riceId: number;
    id: number;
  }) {
    const payment = await this.ensurePaymentAccessible(
      tenantId,
      mealSessionId,
      riceId,
      id,
    );

    return payment;
  }

  async getAll({
    tenantId,
    mealSessionId,
    riceId,
  }: {
    tenantId: number;
    mealSessionId: number;
    riceId: number;
  }) {
    const rice = await riceRepository.getRiceById(
      tenantId,
      mealSessionId,
      riceId,
    );

    if (!rice) {
      throw new ApiError(404, "Rice purchase not found.");
    }

    return ricePaymentRepository.getAllRicePayments(
      tenantId,
      mealSessionId,
      riceId,
    );
  }

  async update({
    tenantId,
    mealSessionId,
    riceId,
    id,
    data,
  }: {
    tenantId: number;
    mealSessionId: number;
    riceId: number;
    id: number;
    data: IUpdateRicePaymentDto;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const payment = await this.ensurePaymentAccessible(
      tenantId,
      mealSessionId,
      riceId,
      id,
    );

    const rice = await riceRepository.getRiceById(
      tenantId,
      mealSessionId,
      riceId,
    );

    if (!rice) {
      throw new ApiError(404, "Rice purchase not found.");
    }

    const amount = Number(data.amount ?? payment.amount);

    const paymentMethod = data.paymentMethod ?? payment.paymentMethod;

    this.validatePaymentMethod(paymentMethod);

    const totalPaid = await ricePaymentRepository.getTotalPaid(
      tenantId,
      mealSessionId,
      riceId,
    );

    const currentPaymentAmount = Number(payment.amount);

    const otherPaymentsTotal = Number(
      (totalPaid - currentPaymentAmount).toFixed(2),
    );

    this.validatePaymentAmount({
      amount,
      totalAmount: Number(rice.totalAmount),
      totalPaid: otherPaymentsTotal,
    });

    const updateData: any = {
      amount,
      paymentMethod,
    };

    if (data.paymentDate !== undefined) {
      updateData.paymentDate = data.paymentDate;
    }

    if (data.note !== undefined) {
      updateData.note = data.note;
    }

    await sequelize.transaction(async (transaction) => {
      await ricePaymentRepository.updateRicePayment(
        tenantId,
        mealSessionId,
        riceId,
        id,
        updateData,
        transaction,
      );

      await riceService.recalculatePaymentStatus({
        tenantId,
        mealSessionId,
        id: riceId,
        transaction,
      });
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.RICE_PAYMENT,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.RICE,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async delete({
    tenantId,
    mealSessionId,
    riceId,
    id,
  }: {
    tenantId: number;
    mealSessionId: number;
    riceId: number;
    id: number;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    await this.ensurePaymentAccessible(tenantId, mealSessionId, riceId, id);

    await sequelize.transaction(async (transaction) => {
      await ricePaymentRepository.deleteRicePayment(
        tenantId,
        mealSessionId,
        riceId,
        id,
        transaction,
      );

      await riceService.recalculatePaymentStatus({
        tenantId,
        mealSessionId,
        id: riceId,
        transaction,
      });
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.RICE_PAYMENT,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.RICE,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async getTotalPaid({
    tenantId,
    mealSessionId,
    riceId,
  }: {
    tenantId: number;
    mealSessionId: number;
    riceId: number;
  }) {
    const rice = await riceRepository.getRiceById(
      tenantId,
      mealSessionId,
      riceId,
    );

    if (!rice) {
      throw new ApiError(404, "Rice purchase not found.");
    }

    const totalPaid = await ricePaymentRepository.getTotalPaid(
      tenantId,
      mealSessionId,
      riceId,
    );

    return Number(totalPaid.toFixed(2));
  }

  async getRemainingDue({
    tenantId,
    mealSessionId,
    riceId,
  }: {
    tenantId: number;
    mealSessionId: number;
    riceId: number;
  }) {
    const rice = await riceRepository.getRiceById(
      tenantId,
      mealSessionId,
      riceId,
    );

    if (!rice) {
      throw new ApiError(404, "Rice purchase not found.");
    }

    const totalPaid = await ricePaymentRepository.getTotalPaid(
      tenantId,
      mealSessionId,
      riceId,
    );

    const remainingDue = Number(
      (Number(rice.totalAmount) - totalPaid).toFixed(2),
    );

    return Math.max(remainingDue, 0);
  }

  private validatePaymentAmount({
    amount,
    totalAmount,
    totalPaid,
  }: {
    amount: number;
    totalAmount: number;
    totalPaid: number;
  }) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ApiError(400, "Payment amount must be greater than zero.");
    }

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      throw new ApiError(
        400,
        "Rice purchase total amount must be greater than zero.",
      );
    }

    if (!Number.isFinite(totalPaid) || totalPaid < 0) {
      throw new ApiError(400, "Invalid total paid amount.");
    }

    const remainingDue = Number((totalAmount - totalPaid).toFixed(2));

    if (amount > remainingDue) {
      throw new ApiError(400, "Payment amount cannot exceed remaining due.");
    }
  }

  private validatePaymentMethod(paymentMethod: RicePaymentMethodValue) {
    if (!RICE_PAYMENT_METHODS.includes(paymentMethod)) {
      throw new ApiError(400, "Invalid rice payment method.");
    }
  }

  private async ensurePaymentAccessible(
    tenantId: number,
    mealSessionId: number,
    riceId: number,
    id: number,
  ) {
    const payment = await ricePaymentRepository.getRicePaymentById(
      tenantId,
      mealSessionId,
      riceId,
      id,
    );

    if (!payment) {
      throw new ApiError(404, "Rice payment not found.");
    }

    return payment;
  }
}

export const ricePaymentService = new RicePaymentService();
