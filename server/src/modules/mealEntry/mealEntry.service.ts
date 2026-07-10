import sequelize from "@/configs/db.js";
import { MealEntryRepository } from "./mealEntry.repository.js";
import { ApiError } from "@/utils/ApiError.js";

export class MealEntryService {
  constructor(private readonly mealEntryRepository: MealEntryRepository) {}

  async my({ userId, tenantId }: { userId: number; tenantId: number }) {
    return await this.mealEntryRepository.getMyMeal({ tenantId, userId });
  }

  async daily({ date, tenantId }: { date: Date; tenantId: number }) {

    return await sequelize.transaction(async (transaction) => {
      return await this.mealEntryRepository.getDailyEntries(
        { tenantId, date },
        transaction,
      );
    });
  }

  async dailySummary({ tenantId, date }: { tenantId: number; date: Date }) {

    if (!date || Number.isNaN(date.getTime())) {
      throw new ApiError(400, "Valid date is required");
    }

    return this.mealEntryRepository.getDailySummary(tenantId, date);
  }

  async memberSummary({ tenantId }: { tenantId: number }) {
    return this.mealEntryRepository.getMemberSummary(tenantId);
  }

  async summary({ tenantId }: { tenantId: number }) {
    return this.mealEntryRepository.getSummary(tenantId);
  }
}
