import { MemberStatus } from "@/constans/index.js";
import { ApiError } from "@/utils/ApiError.js";
import { getActiveMember } from "../tenantMembership/tenantMembership.helper.js";
import {
  ICreateDepositPayload,
  IDeleteDepositPayload,
  IDepositSummaryPayload,
  IGetDepositByIdPayload,
  IGetMemberDepositsPayload,
  IUpdateDepositPayload,
} from "./deposit.interface.js";
import { DepositRepository } from "./deposit.repository.js";

export class DepositService {
  constructor(private readonly depositRepository: DepositRepository) {}

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

  async getSummary({ tenantId, mealSessionId }: IDepositSummaryPayload) {

    return await this.depositRepository.getSummary({
      tenantId,
      mealSessionId,
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

  async getMemberDeposits({
    tenantId,
    memberId,
    mealSessionId,
  }: IGetMemberDepositsPayload) {
    const member = await getActiveMember({
      tenantId,
      userId: memberId,
    });

    return await this.depositRepository.getMemberDeposits({
      tenantId,
      memberId,
      mealSessionId,
    });
  }

  async updateDeposit({
    tenantId,
    mealSessionId,
    depositId,
    payload,
  }: {
    tenantId: number;
    mealSessionId: number;
    depositId: number;
    payload: IUpdateDepositPayload;
  }) {
    const deposit = await this.depositRepository.getById({
      tenantId,
      mealSessionId,
      depositId,
    });

    if (!deposit) {
      throw new ApiError(404, "Deposit not found.");
    }

    await this.depositRepository.update(deposit, payload);

    return await this.depositRepository.getById({
      tenantId,
      depositId,
      mealSessionId,
    });
  }

  async deleteDeposit({
    tenantId,
    depositId,
    mealSessionId,
  }: IDeleteDepositPayload) {
    const deposit = await this.depositRepository.getById({
      tenantId,
      depositId,
      mealSessionId,
    });

    if (!deposit) {
      throw new ApiError(404, "Deposit not found.");
    }

    await this.depositRepository.deleteDeposit(deposit);

    return true;
  }
}
