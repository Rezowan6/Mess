import sequelize from "@/configs/db.js";
import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { getAppDate, isWithinHours } from "@/utils/date.util.js";
import { Transaction } from "sequelize";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { partyExpenseMemberRepository } from "../PartyExpenseMember/partyExpenseMember.repository.js";
import { membershipRepository } from "../tenantMembership/tenantMembership.repository.js";
import { ICreatePartyExpenseDto } from "./partyExpense.interface.js";
import { partyExpenseRepository } from "./partyExpense.repository.js";

class PartyExpenseService {
  private async syncMembers({
    tenantId,
    partyExpenseId,
    amount,
    memberIds,
    transaction,
  }: {
    tenantId: number;
    partyExpenseId: number;
    amount: number;
    memberIds: number[];
    transaction: Transaction;
  }) {
    if (!memberIds.length) {
      throw new ApiError(400, "At least one member is required.");
    }

    const members = await Promise.all(
      memberIds.map((userId) =>
        membershipRepository.findByActiveUser({
          tenantId,
          userId,
        }),
      ),
    );

    if (members.some((member) => !member)) {
      throw new ApiError(
        403,
        "One or more members do not belong to this tenant.",
      );
    }

    await partyExpenseMemberRepository.delete(
      { partyExpenseId },
      { force: true, transaction },
    );

    const shareAmount = amount / memberIds.length;

    await Promise.all(
      memberIds.map((memberId) =>
        partyExpenseMemberRepository.createWithOptions(
          {
            partyExpenseId,
            memberId,
            amount: shareAmount,
          },
          { transaction },
        ),
      ),
    );
  }
  async create(data: ICreatePartyExpenseDto, memberIds: number[]) {
    const { tenantId, mealSessionId, amount } = data;
    const transaction = await sequelize.transaction();

    await mealSessionRepository.ensureSessionOpen(
      tenantId,
      mealSessionId,
      transaction,
    );

    try {
      const partyExpense = await partyExpenseRepository.createWithOptions(
        { ...data, date: getAppDate() },
        { transaction },
      );

      await this.syncMembers({
        tenantId,
        partyExpenseId: partyExpense.id,
        amount,
        memberIds,
        transaction,
      });

      await transaction.commit();

      socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
        resource: RealtimeResource.PARTY_EXPENSE,
        action: RealtimeAction.CREATED,
        tenantId: tenantId,
        mealSessionId: mealSessionId,
      });

      return partyExpense;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(
    {
      id,
      tenantId,
      mealSessionId,
    }: {
      id: number;
      tenantId: number;
      mealSessionId: number;
    },
    data: ICreatePartyExpenseDto,
    memberIds: number[],
  ) {
    const transaction = await sequelize.transaction();

    await mealSessionRepository.ensureSessionOpen(
      tenantId,
      mealSessionId,
      transaction,
    );

    try {
      const partyExpense = await partyExpenseRepository.findOne({
        id,
        tenantId,
        mealSessionId,
      });

      if (!partyExpense) {
        throw new ApiError(404, "Party expense not found.");
      }

      if (!isWithinHours(partyExpense.createdAt, 24)) {
        throw new ApiError(
          409,
          "This party record can only be updated within 24 hours of creation.",
        );
      }

      await partyExpenseRepository.update(
        { id },
        {
          amount: data.amount,
          description: data.description ?? null,
        },
        { transaction },
      );

      await this.syncMembers({
        tenantId,
        partyExpenseId: partyExpense.id,
        amount: data.amount,
        memberIds,
        transaction,
      });

      await transaction.commit();

      socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
        resource: RealtimeResource.PARTY_EXPENSE,
        action: RealtimeAction.UPDATED,
        tenantId: tenantId,
        mealSessionId: mealSessionId,
      });

      return null;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAll({
    tenantId,
    mealSessionId,
    query,
  }: {
    tenantId: number;
    mealSessionId: number;
    query: IPaginationQuery;
  }) {
    const partyExpenses = await partyExpenseRepository.getAll(
      tenantId,
      mealSessionId,
      query,
    );

    if (!partyExpenses) {
      throw new ApiError(404, "Party expenses not found.");
    }

    return partyExpenses;
  }

  async delete({
    id,
    tenantId,
    mealSessionId,
  }: {
    id: number;
    tenantId: number;
    mealSessionId: number;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const partyExpense = await partyExpenseRepository.findOne({
      id,
      tenantId,
      mealSessionId,
    });

    if (!partyExpense) {
      throw new ApiError(404, "Party expense not found.");
    }

    if (!isWithinHours(partyExpense.createdAt, 24)) {
      throw new ApiError(
        409,
        "This party record can only be deleted within 24 hours of creation.",
      );
    }

    await partyExpenseRepository.delete({ id });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.PARTY_EXPENSE,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
    });

    return null;
  }
}

export const partyExpenseService = new PartyExpenseService();
