import sequelize from "@/configs/db.js";
import { ApiError } from "@/utils/ApiError.js";
import { MealEntryRepository } from "../mealEntry/mealEntry.repository.js";
import { MealSessionStatus } from "../mealSession/mealSession.interface.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";
import {
  CreateMealRequestDto,
  MealRequestStatus,
} from "./mealRequest.interface.js";
import { MealRequestRepository } from "./mealRequest.repository.js";

export class MealRequestService {
  constructor(
    private readonly mealRequestRepository: MealRequestRepository,
    private readonly mealSessionRepository: MealSessionRepository,
    private readonly mealEntryRepository: MealEntryRepository,
  ) {}

  async create(data: CreateMealRequestDto) {
    const { tenantId, userId, date, breakfast, lunch, dinner } = data;

    const mealSession =
      await this.mealSessionRepository.getCurrentSession(tenantId);

    if (!mealSession) {
      throw new ApiError(404, "Meal session not found");
    }

    const mealSessionId = mealSession.id;

    if (!mealSessionId) {
      throw new ApiError(404, "Meal session Id required.");
    }

    if (mealSession.tenantId !== tenantId) {
      throw new ApiError(403, "Invalid meal session");
    }
    if (mealSession.status !== MealSessionStatus.OPEN) {
      throw new ApiError(400, "Meal session is closed");
    }

    const existingRequest =
      await this.mealRequestRepository.getByTenantMealSessionUserIdAndDate({
        tenantId,
        mealSessionId,
        userId,
        date,
      });

    if (existingRequest) {
      throw new ApiError(409, "Meal request already exists for this date");
    }

    if (!breakfast && !lunch && !dinner) {
      throw new ApiError(400, "Please select at least one meal");
    }

    return this.mealRequestRepository.createMealRequest({
      ...data,
      date,
      mealSessionId,
      status: MealRequestStatus.PENDING,
    });
  }

  async getPendingRequests({ tenantId }: { tenantId: number }) {
    return await this.mealRequestRepository.getPendingRequestsByTenantId(
      tenantId,
    );
  }

  async my({ tenantId, userId }: { tenantId: number; userId: number }) {
    return this.mealRequestRepository.getMyMealRequests({ userId, tenantId });
  }

  async approve({
    id,
    tenantId,
    managerId,
  }: {
    id: number;
    tenantId: number;
    managerId: number;
  }) {
    return await sequelize.transaction(async (transaction) => {
      const request = await this.mealRequestRepository.getMealRequestById(
        id,
        transaction,
      );

      if (!request) {
        throw new ApiError(404, "Meal request not found.");
      }

      if (request.tenantId !== tenantId) {
        throw new ApiError(400, "Unauthorized.");
      }

      if (request.status !== MealRequestStatus.PENDING) {
        throw new ApiError(400, "Only pending request can be approved");
      }

      await this.mealRequestRepository.updateMealRequest(
        id,
        {
          status: MealRequestStatus.APPROVED,
          approvedBy: managerId,
          approvedAt: new Date(),
        },
        transaction,
      );

      await this.mealEntryRepository.createMealEntry(
        {
          tenantId,
          userId: request.userId,
          mealSessionId: request.mealSessionId,
          date: request.date,

          breakfast: request.breakfast,
          lunch: request.lunch,
          dinner: request.dinner,

          mealRequestId: request.id,
        },
        transaction,
      );

      return request;
    });
  }

  async approveAllPending({
    tenantId,
    managerId,
    date,
  }: {
    tenantId: number;
    managerId: number;
    date: Date;
  }) {
    return sequelize.transaction(async (transaction) => {

      const requests =
        await this.mealRequestRepository.getPendingRequestsByDate(
          { tenantId, date },
          transaction,
        );
      if (!requests.length) {
        throw new ApiError(404, "No pending meal requests found.");
      }
      const mealEntries = requests.map((request) => ({
        tenantId,
        userId: request.userId,
        mealSessionId: request.mealSessionId,
        date: request.date,

        breakfast: request.breakfast,
        lunch: request.lunch,
        dinner: request.dinner,

        mealRequestId: request.id,
      }));

      await this.mealEntryRepository.bulkCreateMealEntries(
        mealEntries,
        transaction,
      );

      await this.mealRequestRepository.bulkApproveRequests(
        requests.map((request) => request.id),
        managerId,
        transaction,
      );
      return {
        approvedCount: requests.length,
      };
    });
  }

  async reject({
    id,
    tenantId,
    managerId,
  }: {
    id: number;
    tenantId: number;
    managerId: number;
  }) {
    return sequelize.transaction(async (transaction) => {
      const request = await this.mealRequestRepository.getMealRequestById(
        id,
        transaction,
      );

      if (!request) {
        throw new ApiError(404, "Meal request not found.");
      }

      if (request.tenantId !== tenantId) {
        throw new ApiError(403, "You cannot reject this request.");
      }

      if (request.status !== MealRequestStatus.PENDING) {
        throw new ApiError(400, "Only pending request can be rejected.");
      }

      await this.mealRequestRepository.updateMealRequest(
        id,
        {
          status: MealRequestStatus.REJECTED,
          rejectedBy: managerId,
          rejectedAt: new Date(),
        },
        transaction,
      );

      return {
        ...request,
        status: MealRequestStatus.REJECTED,
      };
    });
  }
}
