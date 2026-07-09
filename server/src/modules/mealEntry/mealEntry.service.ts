import { MealEntryRepository } from "./mealEntry.repository.js";

export class MealEntryService {
  constructor(private readonly mealEntryRepository: MealEntryRepository) {}
  async my({ userId, tenantId }: { userId: number; tenantId: number }) {
    return await this.mealEntryRepository.getMyMeal({ tenantId, userId });
  }
}
