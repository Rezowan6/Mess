import sequelize from "@/configs/db.js";
import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import { getDateBeforeDays, isWithinHours } from "@/utils/date.util.js";
import { logger } from "@/utils/logger.js";
import { UniqueConstraintError } from "sequelize";
import { DepositPaymentMethodType } from "../deposit/deposit.interface.js";
import { Notification } from "../notification/notification.interface.js";
import { notificationService } from "../notification/notification.service.js";
import { membershipRepository } from "../tenantMembership/tenantMembership.repository.js";
import {
  CurrentBillStatus,
  ICreateCurrentBillDto,
  IDeleteCurrentBillDto,
  IGetBYIdCurrentBill,
  IGetCurrentBills,
  IRestoreCurrentBillDto,
  IUpdateCurrentBillDto,
} from "./currentBill.interface.js";
import { currentBillRepository } from "./currentBill.repository.js";

const PAID_STATUS: CurrentBillStatus = "paid";

class CurrentBillService {
  async getMembercurrentBills({
    tenantId,
    month,
    year,
    query,
  }: IGetCurrentBills) {
    return await currentBillRepository.getMemberCurrentBills({
      tenantId,
      month,
      year,
      query,
    });
  }

  async getById({ tenantId, userId, year }: IGetBYIdCurrentBill) {
    return await currentBillRepository.getByIdMemberCurrentBill({
      tenantId,
      userId,
      year,
    });
  }

  async getDeletedCurrentBills(tenantId: number) {
    return currentBillRepository.getDeletedCurrentBills(tenantId);
  }

  async create(data: ICreateCurrentBillDto) {
    const { tenantId, userId, month, year, amount, paymentMethod, createdBy } =
      data;

    // The member must belong to this mess
    const isMember = await membershipRepository.exists({
      tenantId,
      userId,
      status: "active",
    });

    if (!isMember) {
      throw new ApiError(404, "Member not found in this mess.");
    }

    // Only the validated fields are stored. The unique index is the final guard
    // against two requests creating the same bill at the same moment.
    const result = await currentBillRepository
      .create({
        tenantId,
        userId,
        month,
        year,
        amount,
        paymentMethod,
        createdBy,
        status: PAID_STATUS,
      })
      .catch((error: unknown) => {
        if (error instanceof UniqueConstraintError) {
          throw new ApiError(
            409,
            "A current bill already exists for this member and month.",
          );
        }

        throw error;
      });

    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.CURRENT_BILL,
      action: RealtimeAction.CREATED,
      tenantId,
      userId,
    });

    // A notification failure must never fail the create itself.
    try {
      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "Current-bill Added",
        message: `Your current bill of ৳ ${Number(result.amount).toFixed(2)} for ${month}/${year} has been added to your account.`,
        type: Notification.CURRENT_BILL_ADDED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId },
        "Current-bill create notification creation failed",
      );
    }

    return null;
  }

  async update(data: IUpdateCurrentBillDto) {
    const { id, tenantId, createdBy, amount, paymentMethod } = data;

    const changed = await sequelize.transaction(async (transaction) => {
      // Lock the row so an update and a delete cannot run at the same time
      const currentBill = await currentBillRepository.findOneWithOptions({
        where: { id, tenantId },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!currentBill) {
        throw new ApiError(404, "currentBill not found.");
      }

      if (!isWithinHours(currentBill.createdAt, 24)) {
        throw new ApiError(
          409,
          "This currentBill can only be updated within 24 hours of creation.",
        );
      }

      const oldAmount = Number(currentBill.amount);

      const updates: {
        amount?: number;
        paymentMethod?: DepositPaymentMethodType;
      } = {};

      if (amount !== undefined && amount !== oldAmount) {
        updates.amount = amount;
      }

      if (
        paymentMethod !== undefined &&
        paymentMethod !== currentBill.paymentMethod
      ) {
        updates.paymentMethod = paymentMethod;
      }

      // Nothing really changed: no write, no event, no notification
      if (Object.keys(updates).length === 0) return null;

      await currentBillRepository.update({ id, tenantId }, updates, {
        transaction,
      });

      return {
        userId: currentBill.userId,
        month: currentBill.month,
        year: currentBill.year,
        oldAmount,
        newAmount: updates.amount ?? oldAmount,
      };
    });

    if (!changed) return null;

    const { userId, month, year, oldAmount, newAmount } = changed;

    // Emit only after a successful commit
    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.CURRENT_BILL,
      action: RealtimeAction.UPDATED,
      tenantId,
      userId,
    });

    // A notification failure must never fail the update itself.
    try {
      const billingPeriod = `${month}/${year}`;

      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "Current-bill Updated",
        message:
          newAmount !== oldAmount
            ? `Your current bill for ${billingPeriod} has been updated from ৳ ${oldAmount.toFixed(2)} to ৳ ${newAmount.toFixed(2)}.`
            : `Your current bill details for ${billingPeriod} have been updated.`,
        type: Notification.CURRENT_BILL_UPDATED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId },
        "Current-bill update notification creation failed",
      );
    }

    return null;
  }

  async delete(data: IDeleteCurrentBillDto) {
    const { id, tenantId, createdBy } = data;

    const deleted = await sequelize.transaction(async (transaction) => {
      const currentBill = await currentBillRepository.findOneWithOptions({
        where: { id, tenantId },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!currentBill) {
        throw new ApiError(404, "currentBill not found.");
      }

      if (!isWithinHours(currentBill.createdAt, 24)) {
        throw new ApiError(
          409,
          "This currentBill can only be deleted within 24 hours of creation.",
        );
      }

      // The tenant in the where clause keeps the delete inside this tenant
      await currentBillRepository.delete({ id, tenantId }, { transaction });

      return {
        userId: currentBill.userId,
        month: currentBill.month,
        year: currentBill.year,
        amount: Number(currentBill.amount),
      };
    });

    const { userId, month, year, amount } = deleted;

    // Emit only after a successful commit
    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.CURRENT_BILL,
      action: RealtimeAction.DELETED,
      tenantId,
      userId,
    });

    // A notification failure must never fail the delete itself.
    try {
      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "Current-bill Removed",
        message: `Your current bill of ৳ ${amount.toFixed(2)} for ${month}/${year} has been removed.`,
        type: Notification.CURRENT_BILL_DELETED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId },
        "Current-bill delete notification creation failed",
      );
    }

    return null;
  }

  async restore(data: IRestoreCurrentBillDto) {
    const { id, tenantId, createdBy } = data;

    const restored = await sequelize
      .transaction(async (transaction) => {
        const currentBill =
          await currentBillRepository.findByIdIncludingDeleted(
            { id, tenantId },
            transaction,
          );

        if (!currentBill) {
          throw new ApiError(404, "currentBill not found.");
        }

        if (!currentBill.deletedAt) {
          throw new ApiError(409, "This currentBill is not deleted.");
        }

        if (!isWithinHours(currentBill.createdAt, 24)) {
          throw new ApiError(
            409,
            "This currentBill can only be restored within 24 hours of creation.",
          );
        }

        const { userId, month, year } = currentBill;

        // A new bill may have been created for the same member and month after this one was deleted
        const duplicate = await currentBillRepository.findOneWithOptions({
          where: { tenantId, userId, month, year },
          transaction,
        });

        if (duplicate) {
          throw new ApiError(
            409,
            "A current bill already exists for this member and month.",
          );
        }

        await currentBillRepository.restore({ id, tenantId }, { transaction });

        return {
          userId,
          month,
          year,
          amount: Number(currentBill.amount),
        };
      })
      .catch((error: unknown) => {
        // Two requests created the same bill at the same moment, the unique index stops the second
        if (error instanceof UniqueConstraintError) {
          throw new ApiError(
            409,
            "A current bill already exists for this member and month.",
          );
        }

        throw error;
      });

    const { userId, month, year, amount } = restored;

    // Emit only after a successful commit
    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.CURRENT_BILL,
      action: RealtimeAction.RESTORED,
      tenantId,
      userId,
    });

    // Notify only the member whose current bill came back.
    // A notification failure must never fail the restore itself.
    try {
      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "Current-bill Restored",
        message: `Your current bill of ৳ ${amount.toFixed(2)} for ${month}/${year} has been restored.`,
        type: Notification.CURRENT_BILL_RESTORED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId },
        "Current-bill restore notification creation failed",
      );
    }

    return null;
  }

  async purgeExpiredDeletedCurrentBills(): Promise<number> {
    const cutoffDate = getDateBeforeDays(7);

    return currentBillRepository.permanentlyDeleteExpiredSoftDeleted(
      cutoffDate,
    );
  }
}

export const currentBillService = new CurrentBillService();
