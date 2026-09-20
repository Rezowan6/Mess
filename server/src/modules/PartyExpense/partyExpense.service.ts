import sequelize from "@/configs/db.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { getAppDate } from "@/utils/date.util.js";
import { Transaction } from "sequelize";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { partyExpenseMemberRepository } from "../PartyExpenseMember/partyExpenseMember.repository.js";
import { ICreatePartyExpenseDto } from "./partyExpense.interface.js";
import { partyExpenseRepository } from "./partyExpense.repository.js";

class PartyExpenseService {
  private async syncMembers(
    partyExpenseId: number,
    amount: number,
    memberIds: number[],
    transaction: Transaction,
  ) {
    if (!memberIds.length) {
      throw new ApiError(400, "At least one member is required.");
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
    const transaction = await sequelize.transaction();

    await mealSessionRepository.ensureSessionOpen(data?.tenantId,data?.mealSessionId, transaction);

    try {
      const partyExpense = await partyExpenseRepository.createWithOptions(
        { ...data, date: getAppDate() },
        { transaction },
      );

      await this.syncMembers(
        partyExpense.id,
        data.amount,
        memberIds,
        transaction,
      );

      await transaction.commit();

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

      await partyExpenseRepository.update(
        { id },
        {
          amount: data.amount,
          description: data.description ?? null,
        },
        { transaction },
      );

      await this.syncMembers(id, data.amount, memberIds, transaction);

      await transaction.commit();

      return await partyExpenseRepository.findOne({
        id,
        tenantId,
        mealSessionId,
      });
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

    await partyExpenseRepository.delete({ id });

    return true;
  }
}

export const partyExpenseService = new PartyExpenseService();
