import sequelize from "@/configs/db.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { mealEntryRepository } from "./mealEntry.repository.js";

class MealEntryService {
  async my({ userId, tenantId }: { userId: number; tenantId: number }) {
    return await mealEntryRepository.getMyMeal({ tenantId, userId });
  }

  async getAllMembersMeal({
    mealSessionId,
    tenantId,
  }: {
    mealSessionId: number;
    tenantId: number;
  }) {
    return await mealEntryRepository.getAllMembersMeals({
      tenantId,
      mealSessionId,
    });
  }

  async todayMealEntries({ date, tenantId }: { date: Date; tenantId: number }) {
    return await sequelize.transaction(async (transaction) => {
      return await mealEntryRepository.todayMealEntries(
        { tenantId, date },
        transaction,
      );
    });
  }

  async dailySummary({ tenantId, date }: { tenantId: number; date: Date }) {
    if (!date || Number.isNaN(date.getTime())) {
      throw new ApiError(400, "Valid date is required");
    }

    return mealEntryRepository.getDailySummary(tenantId, date);
  }

  async getMemberMealSummary({
    tenantId,
    mealSessionId,
    query,
  }: {
    tenantId: number;
    mealSessionId: number;
    query: IPaginationQuery;
  }) {
    return await mealEntryRepository.getMemberMealSummary({
      tenantId,
      mealSessionId,
      query,
    });
  }

  async memberSummary({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    return mealEntryRepository.getMemberSummary(tenantId, mealSessionId);
  }

  async summary({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    return mealEntryRepository.getTotalMealByMealSession(
      tenantId,
      mealSessionId,
    );
  }
}

export const mealEntryService = new MealEntryService();
