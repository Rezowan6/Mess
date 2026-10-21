import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import { isWithinHours } from "@/utils/date.util.js";
import { logger } from "@/utils/logger.js";
import { Notification } from "../notification/notification.interface.js";
import { notificationService } from "../notification/notification.service.js";
import {
  ICreateCuttentBillDto,
  IDeleteCuttentBillDto,
  IGetBYIdCurrentBill,
  IGetCurrentBills,
  IUpdateCuttentBillDto,
} from "./currentBill.interface.js";
import { currentBillRepository } from "./currentBill.repository.js";

class CurrentBillService {
  async getMembercurrentBills({ tenantId, month, year }: IGetCurrentBills) {
    return await currentBillRepository.getMemberCurrentBills({
      tenantId,
      month,
      year,
    });
  }

  async getById({ tenantId, userId, year }: IGetBYIdCurrentBill) {
    return await currentBillRepository.getByIdMemberCurrentBill({
      tenantId,
      userId,
      year,
    });
  }

  async create(data: ICreateCuttentBillDto) {
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
    const result = await currentBillRepository.create({ ...data });

    socketService.emitToUser(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.CURRENT_BILL,
      action: RealtimeAction.CREATED,
      tenantId,
      userId,
    });

    // Notify only the member who received the currentBill.
    try {
      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "Current-bill Added",
        message: `A Current bill of ৳ ${Number(result.amount).toFixed(2)} has been added to your account.`,
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

  async update(data: IUpdateCuttentBillDto) {
    const { id, tenantId, month, year, createdBy } = data;
    const currentBill = await currentBillRepository.findOne({
      id,
      tenantId,
      month,
      year,
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

    // tenantId and mealSessionId in the where clause keep the update inside this tenant
    await currentBillRepository.update({ id, userId, tenantId }, data);

    socketService.emitToUser(tenantId, SocketEvent.DATA_UPDATED, {
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

      const message =
        newAmount !== oldAmount
          ? `Your current-bill has been updated from ৳ ${oldAmount.toFixed(2)} to ৳ ${newAmount.toFixed(2)}.`
          : "Your current-bill details have been updated.";

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

  async delete(data: IDeleteCuttentBillDto) {
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

    socketService.emitToUser(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.CURRENT_BILL,
      action: RealtimeAction.DELETED,
      tenantId,
      userId,
    });

    // Notify only the member whose deposit was removed.
    // A notification failure must never fail the delete itself.
    try {
      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "current-bill Removed",
        message: `Your current-bill of ৳ ${amount.toFixed(2)} has been removed.`,
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
}

export const currentBillService = new CurrentBillService();
