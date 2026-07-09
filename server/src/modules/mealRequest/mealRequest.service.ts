import { ApiError } from "@/utils/ApiError.js";
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
  ) {}

  async create(data: CreateMealRequestDto) {
    const { tenantId, userId, date, breakfast, lunch, dinner } =
      data;

    const mealSession =
      await this.mealSessionRepository.getCurrentSession(tenantId);

    if (!mealSession) {
      throw new ApiError(404, "Meal session not found");
    }

    const mealSessionId = mealSession.id;

    if(!mealSessionId) {
      throw new ApiError(404, "Meal session Id required.")
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
      mealSessionId,
      status: MealRequestStatus.PENDING,
    });
  }
}
