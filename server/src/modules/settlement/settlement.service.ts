import sequelize from "@/configs/db.js";
import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ISessionScope } from "@/types/scope.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { logger } from "@/utils/logger.js";
import { UniqueConstraintError } from "sequelize";
import { Notification } from "../notification/notification.interface.js";
import { notificationService } from "../notification/notification.service.js";
import type {
  ICreateSettlementInput,
  IUpdateSettlementInput,
} from "./settlement.interface.js";
import { settlementRepository } from "./settlement.repository.js";

class SettlementService {
  async createSettlement(data: ICreateSettlementInput) {
    const {
      tenantId,
      mealSessionId,
      memberId,
      payerId,
      payeeId,
      amount,
      currency = "BDT",
      paymentMethod,
      calculationSnapshot,
      initiatedBy,
    } = data;

    if (
      !Number.isInteger(tenantId) ||
      tenantId <= 0 ||
      !Number.isInteger(mealSessionId) ||
      mealSessionId <= 0 ||
      !Number.isInteger(memberId) ||
      memberId <= 0 ||
      !Number.isInteger(payerId) ||
      payerId <= 0 ||
      !Number.isInteger(payeeId) ||
      payeeId <= 0 ||
      !Number.isInteger(initiatedBy) ||
      initiatedBy <= 0
    ) {
      throw new ApiError(400, "Invalid settlement identifiers.");
    }

    if (payerId === payeeId) {
      throw new ApiError(400, "Payer and payee must be different users.");
    }

    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      Math.round(amount * 100) !== amount * 100
    ) {
      throw new ApiError(
        400,
        "Settlement amount must be a valid positive amount.",
      );
    }

    if (
      !calculationSnapshot ||
      typeof calculationSnapshot !== "object" ||
      Array.isArray(calculationSnapshot)
    ) {
      throw new ApiError(400, "A valid calculation snapshot is required.");
    }

    if (!paymentMethod) {
      throw new ApiError(400, "Payment method is required.");
    }

    if (!/^[A-Z]{3}$/.test(currency)) {
      throw new ApiError(400, "Currency must be a valid three-letter code.");
    }

    try {
      await settlementRepository.create({
        ...data,
        currency,
        status: data.status ?? "PENDING",
        paymentProviderSnapshot: data.paymentProviderSnapshot ?? null,
        accountLast4: data.accountLast4 ?? null,
        transactionReference: data.transactionReference?.trim() || null,
        idempotencyKey: data.idempotencyKey?.trim() || null,
        note: data.note?.trim() || null,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ApiError(
          409,
          "A settlement with this idempotency key already exists.",
        );
      }

      throw error;
    }
    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.SETTLEMENT,
      action: RealtimeAction.CREATED,
      tenantId,
      mealSessionId,
    });

    try {
      await notificationService.create({
        tenantId,
        userId: payerId,
        createdBy: initiatedBy,
        mealSessionId,
        title: "Settlement Created",
        message: `A settlement of ৳ ${Number(amount).toFixed(2)} has been created.`,
        type: Notification.SETTLEMENT_CREATED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId: payerId },
        "Settlement notification creation failed",
      );
    }
  }

  async getSettlements({ tenantId, mealSessionId }: ISessionScope) {
    return settlementRepository.findAll({
      where: { tenantId, mealSessionId },
      order: [["createdAt", "DESC"]],
    });
  }

  async getSettlementById(
    id: number,
    { tenantId, mealSessionId }: ISessionScope,
  ) {
    const settlement = await settlementRepository.findOne({
      id,
      tenantId,
      mealSessionId,
    });

    if (!settlement) {
      throw new ApiError(404, "Settlement not found.");
    }

    return settlement;
  }

  async updateSettlement(
    id: number,
    data: IUpdateSettlementInput,
    { tenantId, mealSessionId }: ISessionScope,
  ) {
    const allowedFields = Object.keys(data);

    if (allowedFields.length === 0) {
      throw new ApiError(400, "Nothing to update.");
    }

    const settlement = await sequelize.transaction(async (transaction) => {
      const existingSettlement = await settlementRepository.findOneWithOptions({
        where: { id, tenantId, mealSessionId },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!existingSettlement) {
        throw new ApiError(404, "Settlement not found.");
      }

      if (
        existingSettlement.status === "PAID" ||
        existingSettlement.status === "CANCELLED"
      ) {
        throw new ApiError(
          400,
          "Paid or cancelled settlements cannot be updated.",
        );
      }

      const updates: Record<string, unknown> = {};

      if (data.amount !== undefined) {
        if (
          !Number.isFinite(data.amount) ||
          data.amount <= 0 ||
          Math.round(data.amount * 100) !== data.amount * 100
        ) {
          throw new ApiError(400, "Invalid settlement amount.");
        }

        updates.amount = data.amount;
      }

      if (data.currency !== undefined) {
        if (!/^[A-Z]{3}$/.test(data.currency)) {
          throw new ApiError(400, "Invalid currency.");
        }

        updates.currency = data.currency;
      }

      if (data.paymentMethod !== undefined) {
        updates.paymentMethod = data.paymentMethod;
      }

      if (data.paymentMethodId !== undefined) {
        updates.paymentMethodId = data.paymentMethodId;
      }

      if (data.paymentProviderSnapshot !== undefined) {
        updates.paymentProviderSnapshot = data.paymentProviderSnapshot;
      }

      if (data.accountLast4 !== undefined) {
        if (data.accountLast4 !== null && !/^\d{4}$/.test(data.accountLast4)) {
          throw new ApiError(400, "Account last four digits must be numeric.");
        }

        updates.accountLast4 = data.accountLast4;
      }

      if (data.transactionReference !== undefined) {
        updates.transactionReference =
          data.transactionReference?.trim() || null;
      }

      if (data.note !== undefined) {
        updates.note = data.note?.trim() || null;
      }

      if (data.calculationSnapshot !== undefined) {
        if (
          !data.calculationSnapshot ||
          typeof data.calculationSnapshot !== "object" ||
          Array.isArray(data.calculationSnapshot)
        ) {
          throw new ApiError(400, "Invalid calculation snapshot.");
        }

        updates.calculationSnapshot = data.calculationSnapshot;
      }

      if (data.balanceBefore !== undefined) {
        updates.balanceBefore = data.balanceBefore;
      }

      if (data.balanceAfter !== undefined) {
        updates.balanceAfter = data.balanceAfter;
      }

      if (data.status !== undefined) {
        updates.status = data.status;
      }

      if (data.paidAt !== undefined) updates.paidAt = data.paidAt;
      if (data.cancelledBy !== undefined) {
        updates.cancelledBy = data.cancelledBy;
      }
      if (data.cancelledAt !== undefined) {
        updates.cancelledAt = data.cancelledAt;
      }
      if (data.cancelReason !== undefined) {
        updates.cancelReason = data.cancelReason;
      }
      if (data.disputedBy !== undefined) {
        updates.disputedBy = data.disputedBy;
      }
      if (data.disputedAt !== undefined) {
        updates.disputedAt = data.disputedAt;
      }
      if (data.disputeReason !== undefined) {
        updates.disputeReason = data.disputeReason;
      }
      if (data.resolvedBy !== undefined) {
        updates.resolvedBy = data.resolvedBy;
      }
      if (data.resolvedAt !== undefined) {
        updates.resolvedAt = data.resolvedAt;
      }
      if (data.resolutionNote !== undefined) {
        updates.resolutionNote = data.resolutionNote;
      }

      if (Object.keys(updates).length === 0) {
        throw new ApiError(400, "No valid fields to update.");
      }

      await existingSettlement.update(updates, { transaction });

      return existingSettlement;
    });

    // Emit only after the transaction commits successfully.
    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.SETTLEMENT,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
      settlementId: settlement.id,
    });

    try {
      await notificationService.create({
        tenantId,
        userId: settlement.payerId,
        createdBy: settlement.initiatedBy,
        mealSessionId,
        title: "Settlement Updated",
        message: `Your settlement of ${settlement.currency} ${Number(settlement.amount).toFixed(2)} has been updated.`,
        type: Notification.SETTLEMENT_UPDATED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId: settlement.payerId },
        "Settlement update notification creation failed",
      );
    }

    return settlement;
  }

  async deleteSettlement(
    id: number,
    { tenantId, mealSessionId }: ISessionScope,
  ) {
    const settlement = await sequelize.transaction(async (transaction) => {
      const existingSettlement = await settlementRepository.findOneWithOptions({
        where: { id, tenantId, mealSessionId },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!existingSettlement) {
        throw new ApiError(404, "Settlement not found.");
      }

      if (existingSettlement.status === "PAID") {
        throw new ApiError(400, "Paid settlements cannot be deleted.");
      }

      await settlementRepository.delete(
        { id, tenantId, mealSessionId },
        { transaction, force: true },
      );

      return existingSettlement;
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.SETTLEMENT,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
      settlementId: settlement.id,
    });

    try {
      await notificationService.create({
        tenantId,
        userId: settlement.payerId,
        createdBy: settlement.initiatedBy,
        mealSessionId,
        title: "Settlement Deleted",
        message: `Your settlement of ${settlement.currency} ${Number(settlement.amount).toFixed(2)} has been deleted.`,
        type: Notification.SETTLEMENT_DELETED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId: settlement.payerId },
        "Settlement delete notification creation failed",
      );
    }

    return null;
  }
}

export const settlementService = new SettlementService();
