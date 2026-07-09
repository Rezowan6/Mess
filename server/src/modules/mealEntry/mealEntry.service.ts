import sequelize from "@/configs/db.js";
import { MealEntryRepository } from "./mealEntry.repository.js";

export class MealEntryService {
  constructor(private readonly mealEntryRepository: MealEntryRepository) {}
  
  async my({ userId, tenantId }: { userId: number; tenantId: number }) {
    return await this.mealEntryRepository.getMyMeal({ tenantId, userId });
  }

  async daily({ date, tenantId }: { date: Date; tenantId: number }) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return await sequelize.transaction(async (transaction) => {
      return await this.mealEntryRepository.getDailyEntries(
        { tenantId, date: { start, end } },
        transaction,
      );
    });
  }
}
