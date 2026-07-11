import { ApiError } from "@/utils/ApiError.js";
import { MealSessionStatus } from "../mealSession/mealSession.interface.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";
import { TenantMembershipRepository } from "../tenantMembership/tenantMembership.repository.js";
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
    const { tenantId, memberId, depositDate } = data;
    const currentSession =
      await this.mealSessionRepository.getCurrentSession(tenantId);

    if (currentSession?.status !== MealSessionStatus.OPEN) {
      throw new ApiError(404, "Meal session open not found.");
    }

    const member = await TenantMembershipRepository.findByTenantAndUser({
      tenantId,
      userId: memberId,
    });

    if (!member) {
      throw new ApiError(404, "Member not found.");
    }

    const existingDeposit = await this.depositRepository.getTodayByMemberId({
      tenantId,
      mealSessionId: currentSession.id,
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
      mealSessionId: currentSession.id,
    });
  }

  async getAllDeposits(tenantId: number) {
    const currentSession =
      await this.mealSessionRepository.getCurrentSession(tenantId);

    if (!currentSession) {
      throw new ApiError(404, "Meal session open not found.");
    }

    return await this.depositRepository.getAll({
      tenantId,
      mealSessionId: currentSession.id,
    });
  }

  async getDepositById({ tenantId, depositId }: IGetDepositByIdPayload) {
    const currentSession =
      await this.mealSessionRepository.getCurrentSession(tenantId);

    if (!currentSession) {
      throw new ApiError(404, "Meal session open not found.");
    }
    const deposit = await this.depositRepository.getById({
      tenantId,
      depositId,
      mealSessionId: currentSession.id,
    });

    if (!deposit) {
      throw new ApiError(404, "Deposit not found.");
    }

    return deposit;
  }
}
