import { BaseRepository } from "@/common/repo/base.repository.js";
import { MealPreference } from "./mealPreference.model.js";

class MealPreferencRepository extends BaseRepository<MealPreference> {
  constructor() {
    super(MealPreference);
  }

  async getMyPreference({
    tenantId,
    userId,
  }: {
    tenantId: number;
    userId: number;
  }) {
    return this.findOneWithOptions({
      where: {
        tenantId,
        userId,
      },
    });
  }
}

export const mealPreferenceRepository = new MealPreferencRepository();
