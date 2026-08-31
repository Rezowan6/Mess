import { BaseRepository } from "@/common/repo/base.repository.js";
import { buildSearchCondition } from "@/common/utils/search.util.js";
import { PartyExpense } from "@/models/index.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";

export class PartyExpenseRepository extends BaseRepository<PartyExpense> {
  constructor() {
    super(PartyExpense);
  }

  async getAll(
    tenantId: number,
    mealSessionId: number,
    query: IPaginationQuery,
  ) {
    return await this.paginate(
      {
        where: {
          tenantId,
          mealSessionId,
          ...buildSearchCondition(["description", "date"], query.search),
        },

        attributes: ["id", "amount", "description", "date", "createdAt"],

        include: [
          {
            association: "members",
            attributes: ["id", "memberId", "amount"],
            include: [
              {
                association: "member",
                attributes: ["id", "name", "email", "avatar"],
              },
            ],
          },
          {
            association: "mealSession",
            attributes: ["id", "month", "year", "status"],
          },
        ],

        order: [["date", "DESC"]],
      },
      query,
    );
  }
  async getTotalPartyExpense(tenantId: number, mealSessionId: number) {
    return await this.sum("amount", {
      where: {
        tenantId,
        mealSessionId,
      },
    });
  }
}

export const partyExpenseRepository = new PartyExpenseRepository();
