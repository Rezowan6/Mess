import { MemberStatus } from "@/constans/index.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { getActiveMember } from "../tenantMembership/tenantMembership.helper.js";
import {
  ICreateDepositPayload,
  IDeleteDepositPayload,
  IDepositSummaryPayload,
  IGetDepositByIdPayload,
  IGetMemberDepositsPayload,
  IUpdateDepositPayload,
} from "./deposit.interface.js";
import { depositRepository } from "./deposit.repository.js";

class DepositService {
  async createDeposit(data: ICreateDepositPayload) {
    const { tenantId, memberId, depositDate, mealSessionId } = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const member = await getActiveMember({ tenantId, userId: memberId });

    if (!member || member?.status !== MemberStatus.ACTIVE) {
      throw new ApiError(404, "Member not found.");
    }

    const existingDeposit = await depositRepository.getTodayByMemberId({
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

    return await depositRepository.create({
      ...data,
    });
  }

  async getMemberDepositSummary({
    tenantId,
    mealSessionId,
    query,
  }: IDepositSummaryPayload) {
    return await depositRepository.getMemberDepositSummary({
      tenantId,
      mealSessionId,
      query,
    });
  }

  async getSummary({ tenantId, mealSessionId, query }: IDepositSummaryPayload) {
    return await depositRepository.getSummary({
      tenantId,
      mealSessionId,
    });
  }

  async getDeposits({
    tenantId,
    mealSessionId,
    query,
  }: {
    tenantId: number;
    mealSessionId: number;
    query: IPaginationQuery;
  }) {
    return await depositRepository.getDepodits({
      tenantId,
      mealSessionId,
      query,
    });
  }

  async getDepositById({
    tenantId,
    depositId,
    mealSessionId,
  }: IGetDepositByIdPayload) {
    const deposit = await depositRepository.getById({
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
    return await depositRepository.getMemberDeposits({
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
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const deposit = await depositRepository.getById({
      tenantId,
      mealSessionId,
      depositId,
    });

    if (!deposit) {
      throw new ApiError(404, "Deposit not found.");
    }

    await depositRepository.update({ id: depositId }, payload);

    return await depositRepository.getById({
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
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const deposit = await depositRepository.getById({
      tenantId,
      depositId,
      mealSessionId,
    });

    if (!deposit) {
      throw new ApiError(404, "Deposit not found.");
    }

    await depositRepository.delete({ id: depositId });

    return true;
  }
}

export const depositService = new DepositService();
