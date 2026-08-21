import { IPaginationQuery } from "@/common/types/pagination.interface.js";
import sequelize from "@/configs/db.js";
import { ApiError } from "@/utils/ApiError.js";
import { partyExpenseMemberRepository } from "../PartyExpenseMember/partyExpenseMember.repository.js";
import { ICreatePartyExpenseDto } from "./partyExpense.interface.js";
import { partyExpenseRepository } from "./partyExpense.repository.js";

class PartyExpenseService {
  async create(data: ICreatePartyExpenseDto, memberIds: number[]) {
    if (!memberIds.length) {
      throw new ApiError(400, "At least one member is required.");
    }
    const transaction = await sequelize.transaction();

    try {
      const partyExpense = await partyExpenseRepository.createWithOptions(
        { ...data, date: new Date() },
        { transaction },
      );

      const shareAmount = data.amount / memberIds.length;

      await Promise.all(
        memberIds.map((memberId) =>
          partyExpenseMemberRepository.createWithOptions(
            {
              partyExpenseId: partyExpense.id,
              memberId,
              amount: shareAmount,
            },
            { transaction },
          ),
        ),
      );

      await transaction.commit();

      return partyExpense;
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

  async getById() {}

  async update() {}

  async delete() {}
}

export const partyExpenseService = new PartyExpenseService();
