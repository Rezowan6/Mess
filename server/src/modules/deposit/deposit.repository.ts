import { BaseRepository } from "@/common/repo/base.repository.js";
import { buildSearchCondition } from "@/common/utils/search.util.js";
import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { Deposit } from "@/models/index.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { Op, col, fn } from "sequelize";

class DepositRepository extends BaseRepository<Deposit> {
  constructor() {
    super(Deposit);
  }

  async getSummary({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    const result = await this.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
      attributes: [
        [fn("SUM", col("amount")), "totalDeposit"],
        [fn("COUNT", col("member_id")), "totalMembers"],
      ],
      raw: true,
    });

    const data = result[0] as unknown as {
      totalDeposit: string;
      totalMembers: string;
    };

    const totalDeposit = Number(data?.totalDeposit ?? 0);
    const totalMembers = Number(data?.totalMembers ?? 0);

    return {
      totalDeposit,
      totalMembers,
      averageDeposit: totalMembers > 0 ? totalDeposit / totalMembers : 0,
    };
  }

  async getMemberDepositSummary({
    tenantId,
    mealSessionId,
    query,
  }: {
    tenantId: number;
    mealSessionId: number;
    query: IPaginationQuery;
  }) {
    const memberInclude = {
      association: "member",

      attributes: ["id", "name", "email", "avatar"],

      required: !!query.search,

      ...(query.search && {
        where: {
          name: {
            [Op.like]: `%${query.search}%`,
          },
        },
      }),
    };
    return this.paginateGrouped(
      {
        where: {
          tenantId,
          mealSessionId,
        },

        attributes: ["memberId", [fn("SUM", col("amount")), "totalDeposit"]],

        include: [memberInclude],

        group: ["memberId", "member.id", "member.name"],

        order: [["memberId", "ASC"]],
      },
      query,
    );
  }

  async getTodayByMemberId({
    tenantId,
    mealSessionId,
    memberId,
    depositDate,
  }: {
    tenantId: number;
    mealSessionId: number;
    memberId: number;
    depositDate: Date;
  }) {
    const { start, end } = getRangeTime(depositDate);
    return await this.findOne({
      tenantId,
      memberId,
      mealSessionId,
      depositDate: { [Op.between]: [start, end] },
    });
  }

  async getDepodits({
    tenantId,
    mealSessionId,
    query,
  }: {
    tenantId: number;
    mealSessionId: number;
    query: IPaginationQuery;
  }) {
    const memberInclude = {
      association: "member",

      attributes: ["id", "name", "email", "avatar"],

      required: !!query.search,

      ...(query.search && {
        where: {
          name: {
            [Op.like]: `%${query.search}%`,
          },
        },
      }),
    };

    return await this.paginate(
      {
        where: {
          tenantId,
          mealSessionId,
          ...buildSearchCondition(["depositDate"], query.search),
        },

        attributes: [
          "id",
          "memberId",
          "amount",
          "paymentMethod",
          "depositDate",
          "note",
          "createdAt",
        ],

        include: [
          memberInclude,
          {
            association: "creator",
            attributes: ["id", "name", "email", "avatar"],
          },
          {
            association: "mealSession",
            attributes: ["id", "month", "year", "status"],
          },
        ],

        order: [["depositDate", "DESC"]],
      },
      query,
    );
  }

  async getById({
    tenantId,
    depositId,
    mealSessionId,
  }: {
    tenantId: number;
    depositId: number;
    mealSessionId: number;
  }) {
    return await this.findOneWithOptions({
      where: {
        id: depositId,
        tenantId,
        mealSessionId,
      },
      include: [
        {
          association: "member",
          attributes: ["id", "name", "email"],
        },
        {
          association: "creator",
          attributes: ["id", "name"],
        },
        {
          association: "mealSession",
          attributes: ["id", "month", "year", "status"],
        },
      ],
    });
  }

  async getMemberDeposits({
    tenantId,
    memberId,
    mealSessionId,
  }: {
    tenantId: number;
    memberId: number;
    mealSessionId: number;
  }) {
    return await this.findAll({
      where: {
        tenantId,
        memberId,
        mealSessionId,
      },
      include: [
        {
          association: "member",
          attributes: ["id", "name"],
        },
        {
          association: "creator",
          attributes: ["id", "name"],
        },
        {
          association: "mealSession",
          attributes: ["id", "month", "year", "status"],
        },
      ],
      order: [
        ["depositDate", "DESC"],
        ["createdAt", "DESC"],
      ],
    });
  }

  async getMemberDepositsByMealSession(
    tenantId: number,
    mealSessionId: number,
  ) {
    return Deposit.findAll({
      where: {
        tenantId,
        mealSessionId,
      },

      attributes: ["memberId", [fn("SUM", col("amount")), "totalDeposit"]],

      group: ["memberId"],

      raw: true,
    });
  }

  async getMemberDepositSum(
    tenantId: number,
    mealSessionId: number,
    memberId: number,
  ): Promise<number> {
    return (
      (await this.sum("amount", {
        where: {
          tenantId,
          mealSessionId,
          memberId,
        },
      })) || 0
    );
  }
}

export const depositRepository = new DepositRepository();
