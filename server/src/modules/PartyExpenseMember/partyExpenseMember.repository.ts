import { BaseRepository } from "@/common/repo/base.repository.js";
import { PartyExpenseMember } from "@/models/index.js";

export class PartyExpenseMemberRepository extends BaseRepository<PartyExpenseMember> {
  constructor() {
    super(PartyExpenseMember);
  }

  async getMemberPartyExpenseTotals(tenantId: number, mealSessionId: number) {
    return await this.model.findAll({
      attributes: [
        "memberId",
        [
          this.model.sequelize!.fn(
            "SUM",
            this.model.sequelize!.col("PartyExpenseMember.amount"),
          ),
          "totalPartyCost",
        ],
      ],

      include: [
        {
          association: "partyExpense",
          attributes: [],
          required: true,
          where: {
            tenantId,
            mealSessionId,
          },
        },
      ],

      group: ["memberId"],
      raw: true,
    });
  }
}

export const partyExpenseMemberRepository = new PartyExpenseMemberRepository();
