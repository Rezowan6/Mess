import { BaseRepository } from "@/common/repo/base.repository.js";
import { IGetMealPreferencesBySession, IMealPreferenceWithUser } from "./mealPreference.interface.js";
import { MealPreference } from "./mealPreference.model.js";

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
  }): Promise<IMealPreferenceWithUser[]> {
    return this.findAllWithOptions({
      where: {
        tenantId,
        mealSessionId,
        isActive: true,
      },

      include: [
        {
          association: "user",
          attributes: ["id", "name"],
          required: true,
        },
      ],
    }) as unknown as IMealPreferenceWithUser[]; 
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
