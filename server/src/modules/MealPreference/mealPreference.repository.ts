import { BaseRepository } from "@/common/repo/base.repository.js";
import { IGetMealPreferencesBySession } from "./mealPreference.interface.js";
import { MealPreference } from "./mealPreference.model.js";
import { InferCreationAttributes, Transaction } from "sequelize";

class MealPreferencRepository extends BaseRepository<MealPreference> {
  constructor() {
    super(MealPreference);
  }

  async getMyPreference({
    tenantId,
    userId,
    mealSessionId,
  }: {
    tenantId: number;
    userId: number;
    mealSessionId: number;
  }) {
    return this.findOneWithOptions({
      where: {
        tenantId,
        userId,
        mealSessionId,
      },
    });
  }

  async getActivePreferences({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    return this.findAllWithOptions({
      where: {
        tenantId,
        mealSessionId,
        isActive: true,
      },
    });
  }

  async getByMealSession({
    tenantId,
    mealSessionId,
  }: IGetMealPreferencesBySession) {
    return this.findAll({
      where: {
        tenantId,
        mealSessionId,
        isActive: true,
      },
    });
  }

}

export const mealPreferenceRepository = new MealPreferencRepository();
