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
import { khalaBillStatus } from "../khalaBill/khalaBill.interface.js";
import { Notification } from "../notification/notification.interface.js";
import { notificationService } from "../notification/notification.service.js";
import {
  ICreateCurrentBillDto,
  IDeleteCurrentBillDto,
  IGetBYIdCurrentBill,
  IGetCurrentBills,
  IRestoreCurrentBillDto,
  IUpdateCurrentBillDto,
} from "./currentBill.interface.js";
import { currentBillRepository } from "./currentBill.repository.js";

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
    const { tenantId, userId, month, year, createdBy } = data;

    const currentBill = await currentBillRepository.findOne({
      tenantId,
      userId,
      month,
      year,
    });

    if (currentBill) {
      throw new ApiError(409, "Current bill allready exists this month.");
    }
    const result = await currentBillRepository.create({
      ...data,
      status: khalaBillStatus.paid,
    });

    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.CURRENT_BILL,
      action: RealtimeAction.CREATED,
      tenantId,
      userId,
    });

    // Notify only the member who received the currentBill.
    const billingPeriod = `${month}/${year}`;
    try {
      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "Current-bill Added",
        message: `Your current bill of ৳ ${Number(result.amount).toFixed(2)} for ${billingPeriod} has been added to your account.`,
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
    const { id, tenantId, createdBy } = data;
    const currentBill = await currentBillRepository.findOne({
      id,
      tenantId,
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

    const userId = currentBill.userId;

    // Keep the old amount for the notification message
    const oldAmount = Number(currentBill.amount);

    const updates = {
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.paymentMethod !== undefined && {
        paymentMethod: data.paymentMethod,
      }),
      ...(data.status !== undefined && { status: data.status }),
    };

    await currentBillRepository.update(
      { id, tenantId, userId: currentBill.userId },
      updates,
    );
    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.CURRENT_BILL,
      action: RealtimeAction.UPDATED,
      tenantId,
      userId,
    });

    // Notify only the member whose current bill was changed.
    // A notification failure must never fail the update itself.
    try {
      const newAmount =
        data.amount !== undefined ? Number(data.amount) : oldAmount;

      const billingPeriod = `${currentBill.month}/${currentBill.year}`;

      const message =
        newAmount !== oldAmount
          ? `Your current bill for ${billingPeriod} has been updated from ৳ ${oldAmount.toFixed(2)} to ৳ ${newAmount.toFixed(2)}.`
          : `Your current bill details for ${billingPeriod} have been updated.`;

      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "Current-bill Updated",
        message,
        type: Notification.CURRENT_BILL_UPDATED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId: currentBill.userId },
        "current-bill update notification creation failed",
      );
    }

    return null;
  }

  async delete(data: IDeleteCurrentBillDto) {
    const { id, tenantId, createdBy } = data;

    const currentBill = await currentBillRepository.findOne({
      id,
      tenantId,
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

    // Keep these before deleting, they are needed for the notification
    const userId = currentBill.userId;
    const amount = Number(currentBill.amount);

    // tenantId and mealSessionId in the where clause keep the delete inside this tenant
    await currentBillRepository.delete({
      id,
      tenantId,
      userId,
    });

    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.CURRENT_BILL,
      action: RealtimeAction.DELETED,
      tenantId,
      userId,
    });

    // Notify only the member whose deposit was removed.
    // A notification failure must never fail the delete itself.
    try {
      const billingPeriod = `${currentBill.month}/${currentBill.year}`;

      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "current-bill Removed",
        message: `Your current bill of ৳ ${amount.toFixed(2)} for ${billingPeriod} has been removed.`,
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
