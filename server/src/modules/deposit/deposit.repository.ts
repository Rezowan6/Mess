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
    const {start, end} = getRangeTime(depositDate);
    return await this.depositModel.count({
      where: {
        tenantId,
        memberId,
        mealSessionId,
        depositDate: { [Op.between]: [start, end] },
      },
    });
  }
}
