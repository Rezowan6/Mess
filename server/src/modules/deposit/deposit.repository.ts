import { getRangeTime } from "@/helpers/getRangeTime.helper.js";
import { Deposit } from "@/models/index.js";
import { Op } from "sequelize";
import { ICreateDepositPayload } from "./deposit.interface.js";

export class DepositRepository {
  constructor(private readonly depositModel: typeof Deposit) {}

  async createDeposit(data: ICreateDepositPayload): Promise<Deposit> {
    return await this.depositModel.create(data);
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
}
