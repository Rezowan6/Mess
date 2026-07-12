import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { Deposit } from "@/models/index.js";
import { Op, col, fn } from "sequelize";
import {
  ICreateDepositPayload,
  IUpdateDepositPayload,
} from "./deposit.interface.js";

export class DepositRepository {
  constructor(private readonly depositModel: typeof Deposit) {}

  async createDeposit(data: ICreateDepositPayload): Promise<Deposit> {
    return await this.depositModel.create(data);
  }

  async getSummary({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    const result = await this.depositModel.findAll({
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
    return await this.depositModel.findOne({
      where: {
        tenantId,
        memberId,
        mealSessionId,
        depositDate: { [Op.between]: [start, end] },
      },
    });
  }

  async getAll({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    return await this.depositModel.findAll({
      where: {
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
      order: [["createdAt", "DESC"]],
    });
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
    return await this.depositModel.findOne({
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

  async update(deposit: Deposit, payload: IUpdateDepositPayload) {
    return await deposit.update(payload);
  }

  async deleteDeposit(deposit: Deposit) {
    return await deposit.destroy();
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
    return await this.depositModel.findAll({
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
}
