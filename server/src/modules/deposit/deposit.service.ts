import { MemberStatus } from "@/constans/index.js";
import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { isWithinHours } from "@/utils/date.util.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { Notification } from "../notification/notification.interface.js";
import { notificationService } from "../notification/notification.service.js";
import { getActiveMember } from "../tenantMembership/tenantMembership.helper.js";
import {
  ICreateDepositPayload,
  IDeleteDepositPayload,
  IDepositSummaryPayload,
  IGetDepositByIdPayload,
  IGetMemberDepositsPayload,
  IUpdateDepositPayload,
} from "./deposit.interface.js";
import { depositRepository } from "./deposit.repository.js";

class DepositService {
  async createDeposit(data: ICreateDepositPayload) {
    const { tenantId, memberId, depositDate, mealSessionId, createdBy } = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const member = await getActiveMember({ tenantId, userId: memberId });

    if (!member || member?.status !== MemberStatus.ACTIVE) {
      throw new ApiError(404, "Member not found.");
    }

    const existingDeposit = await depositRepository.getTodayByMemberId({
      tenantId,
      mealSessionId,
      memberId,
      depositDate,
    });

    if (existingDeposit) {
      throw new ApiError(
        409,
        "Deposit already exists for this member in this day.",
      );
    }

    const result = await depositRepository.create({
      ...data,
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.DEPOSIT,
      action: RealtimeAction.CREATED,
      tenantId,
      mealSessionId,
    });

    // Notify only the member who received the deposit.
    // A notification failure must never fail the deposit itself.
    try {
      await notificationService.create({
        tenantId,
        userId: memberId,
        createdBy,
        mealSessionId,
        title: "Deposit Added",
        message: `A deposit of ৳ ${Number(result.amount).toFixed(2)} has been added to your account.`,
        type: Notification.DEPOSIT_ADDED,
      });
    } catch (error) {
      console.error(
        `[Deposit] Failed to create notification for tenant ${tenantId}, user ${memberId}:`,
        error,
      );
    }

    return result;
  }

  async getMemberDepositSummary({
    tenantId,
    mealSessionId,
    query,
  }: IDepositSummaryPayload) {
    return await depositRepository.getMemberDepositSummary({
      tenantId,
      mealSessionId,
      query,
    });
  }

  async getSummary({ tenantId, mealSessionId, query }: IDepositSummaryPayload) {
    return await depositRepository.getSummary({
      tenantId,
      mealSessionId,
    });
  }

  async getDeposits({
    tenantId,
    mealSessionId,
    query,
  }: {
    tenantId: number;
    mealSessionId: number;
    query: IPaginationQuery;
  }) {
    return await depositRepository.getDepodits({
      tenantId,
      mealSessionId,
      query,
    });
  }

  async getDepositById({
    tenantId,
    depositId,
    mealSessionId,
  }: IGetDepositByIdPayload) {
    const deposit = await depositRepository.getById({
      tenantId,
      depositId,
      mealSessionId,
    });

    if (!deposit) {
      throw new ApiError(404, "Deposit not found.");
    }

    return deposit;
  }

  async getMemberDeposits({
    tenantId,
    memberId,
    mealSessionId,
  }: IGetMemberDepositsPayload) {
    return await depositRepository.getMemberDeposits({
      tenantId,
      memberId,
      mealSessionId,
    });
  }

  async updateDeposit({
    tenantId,
    mealSessionId,
    depositId,
    userId: updatedBy,
    payload,
  }: {
    tenantId: number;
    mealSessionId: number;
    depositId: number;
    userId: number;
    payload: IUpdateDepositPayload;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const deposit = await depositRepository.getById({
      tenantId,
      mealSessionId,
      depositId,
    });

    if (!deposit) {
      throw new ApiError(404, "Deposit not found.");
    }

    if (!isWithinHours(deposit.createdAt, 24)) {
      throw new ApiError(
        409,
        "This deposit can only be updated within 24 hours of creation.",
      );
    }

    // Keep the old amount for the notification message
    const oldAmount = Number(deposit.amount);

    // tenantId and mealSessionId in the where clause keep the update inside this tenant
    await depositRepository.update(
      { id: depositId, tenantId, mealSessionId },
      payload,
    );

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.DEPOSIT,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    // Notify only the member whose deposit was changed.
    // A notification failure must never fail the update itself.
    try {
      const newAmount =
        payload.amount !== undefined ? Number(payload.amount) : oldAmount;

      const message =
        newAmount !== oldAmount
          ? `Your deposit has been updated from ৳ ${oldAmount.toFixed(2)} to ৳ ${newAmount.toFixed(2)}.`
          : "Your deposit details have been updated.";

      await notificationService.create({
        tenantId,
        userId: deposit.memberId,
        createdBy: updatedBy,
        mealSessionId,
        title: "Deposit Updated",
        message,
        type: Notification.DEPOSIT_UPDATED,
      });
    } catch (error) {
      console.error(
        `[Deposit] Failed to create update notification for tenant ${tenantId}, user ${deposit.memberId}:`,
        error,
      );
    }

    return null;
  }

  async deleteDeposit({
    tenantId,
    depositId,
    mealSessionId,
    userId: deletedBy,
  }: IDeleteDepositPayload) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const deposit = await depositRepository.getById({
      tenantId,
      depositId,
      mealSessionId,
    });

    if (!deposit) {
      throw new ApiError(404, "Deposit not found.");
    }

    if (!isWithinHours(deposit.createdAt, 24)) {
      throw new ApiError(
        409,
        "This deposit can only be deleted within 24 hours of creation.",
      );
    }

    // Keep these before deleting, they are needed for the notification
    const memberId = deposit.memberId;
    const amount = Number(deposit.amount);

    // tenantId and mealSessionId in the where clause keep the delete inside this tenant
    await depositRepository.delete({
      id: depositId,
      tenantId,
      mealSessionId,
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.DEPOSIT,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
    });

    // Notify only the member whose deposit was removed.
    // A notification failure must never fail the delete itself.
    try {
      await notificationService.create({
        tenantId,
        userId: memberId,
        createdBy: deletedBy,
        mealSessionId,
        title: "Deposit Removed",
        message: `Your deposit of ৳ ${amount.toFixed(2)} has been removed.`,
        type: Notification.DEPOSIT_DELETED,
      });
    } catch (error) {
      console.error(
        `[Deposit] Failed to create delete notification for tenant ${tenantId}, user ${memberId}:`,
        error,
      );
    }

    return null;
  }
}

export const depositService = new DepositService();
