import { MemberStatus } from "@/constans/index.js";
import { ApiError } from "@/utils/ApiError.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";
import { getActiveMember } from "../tenantMembership/tenantMembership.helper.js";
import {
  ICreateDepositPayload,
  IGetDepositByIdPayload,
} from "./deposit.interface.js";
import { DepositRepository } from "./deposit.repository.js";

export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly mealSessionRepository: MealSessionRepository,
  ) {}

  async createDeposit(data: ICreateDepositPayload) {
    const { tenantId, memberId, depositDate, mealSessionId } = data;

    const member = await getActiveMember({ tenantId, userId: memberId });

    if (!member || member?.status !== MemberStatus.ACTIVE) {
      throw new ApiError(404, "Member not found.");
    }

    const existingDeposit = await this.depositRepository.getTodayByMemberId({
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

    return await this.depositRepository.createDeposit({
      ...data,
    });
  }

  async getAllDeposits(tenantId: number, mealSessionId: number) {
    return await this.depositRepository.getAll({
      tenantId,
      mealSessionId,
    });
  }

  async getDepositById({
    tenantId,
    depositId,
    mealSessionId,
  }: IGetDepositByIdPayload) {
    const deposit = await this.depositRepository.getById({
      tenantId,
      depositId,
      mealSessionId,
    });

    if (!deposit) {
      throw new ApiError(404, "Deposit not found.");
    }

    return deposit;
  }
}
