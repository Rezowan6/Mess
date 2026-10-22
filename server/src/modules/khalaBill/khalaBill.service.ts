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
  ICreateKhalaBillDto,
  IDeleteKhalaBillDto,
  IGetBYIdKhalaBill,
  IGetKhalaBills,
  IUpdateKhalaBillDto,
  khalaBillStatus,
} from "./khalaBill.interface.js";
import { khalaBillRepository } from "./khalaBill.repository.js";

class KhalaBillService {
  async getMemberKhalaBills({ tenantId, month, year }: IGetKhalaBills) {
    return await khalaBillRepository.getMemberKhalaBills({
      tenantId,
      month,
      year,
    });
  }

  async getById({ tenantId, userId, year }: IGetBYIdKhalaBill) {
    return await khalaBillRepository.getByIdMemberKhalaBill({
      tenantId,
      userId,
      year,
    });
  }

  async create(data: ICreateKhalaBillDto) {
    const { tenantId, userId, month, year, createdBy } = data;

    const khalaBill = await khalaBillRepository.findOne({
      tenantId,
      userId,
      month,
      year,
    });

    if (khalaBill) {
      throw new ApiError(409, "Khala bill allready exists this month.");
    }
    const result = await khalaBillRepository.create({
      ...data,
      status: khalaBillStatus.paid,
    });

    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.KHALA_BILL,
      action: RealtimeAction.CREATED,
      tenantId,
      userId,
    });

    // Notify only the member who received the khalaBill.
    try {
      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "Khala-bill Added",
        message: `A Khala bill of ৳ ${Number(result.amount).toFixed(2)} has been added to your account.`,
        type: Notification.KHALA_BILL_ADDED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId },
        "Khala-bill create notification creation failed",
      );
    }

    return null;
  }

  async update(data: IUpdateKhalaBillDto) {
    const { id, tenantId, createdBy } = data;
    const khalaBill = await khalaBillRepository.findOne({
      id,
      tenantId,
    });

    if (!khalaBill) {
      throw new ApiError(404, "khalaBill not found.");
    }

    if (!isWithinHours(khalaBill.createdAt, 24)) {
      throw new ApiError(
        409,
        "This khalaBill can only be updated within 24 hours of creation.",
      );
    }

    const userId = khalaBill.userId;

    // Keep the old amount for the notification message
    const oldAmount = Number(khalaBill.amount);

    // tenantId and mealSessionId in the where clause keep the update inside this tenant
    await khalaBillRepository.update({ id, userId, tenantId }, data);

    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.KHALA_BILL,
      action: RealtimeAction.UPDATED,
      tenantId,
      userId,
    });

    // Notify only the member whose khala bill was changed.
    // A notification failure must never fail the update itself.
    try {
      const newAmount =
        data.amount !== undefined ? Number(data.amount) : oldAmount;

      const message =
        newAmount !== oldAmount
          ? `Your khala-bill has been updated from ৳ ${oldAmount.toFixed(2)} to ৳ ${newAmount.toFixed(2)}.`
          : "Your khala-bill details have been updated.";

      await notificationService.create({
        tenantId,
        userId,
        createdBy,
        mealSessionId: null,
        title: "khala-bill Updated",
        message,
        type: Notification.KHALA_BILL_UPDATED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId: khalaBill.userId },
        "khala-bill update notification creation failed",
      );
    }

    return null;
  }

  async delete(data: IDeleteKhalaBillDto) {
    const { id, tenantId, createdBy } = data;

    const khalaBill = await khalaBillRepository.findOne({
      id,
      tenantId,
    });

    if (!khalaBill) {
      throw new ApiError(404, "khalaBill not found.");
    }

    if (!isWithinHours(khalaBill.createdAt, 24)) {
      throw new ApiError(
        409,
        "This khalaBill can only be deleted within 24 hours of creation.",
      );
    }

    // Keep these before deleting, they are needed for the notification
    const userId = khalaBill.userId;
    const amount = Number(khalaBill.amount);

    // tenantId and mealSessionId in the where clause keep the delete inside this tenant
    await khalaBillRepository.delete({
      id,
      tenantId,
      userId,
    });

    socketService.emitToTenantUser(tenantId, userId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.KHALA_BILL,
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
        title: "khala-bill Removed",
        message: `Your khala-bill of ৳ ${amount.toFixed(2)} has been removed.`,
        type: Notification.KHALA_BILL_DELETED,
      });
    } catch (error) {
      logger.error(
        { error, tenantId, userId },
        "Khala-bill delete notification creation failed",
      );
    }

    return null;
  }
}

export const khalaBillService = new KhalaBillService();
