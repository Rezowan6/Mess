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

  async getActivePreferences({
    tenantId,
  }: {
    tenantId: number;
  }): Promise<IMealPreferenceWithUser[]> {
    return this.findAllWithOptions({
      where: {
        tenantId,
        isActive: true,
      },

      include: [
        {
          association: "user",
          attributes: ["id", "name", "avatar", "email"],
          required: true,
        },
      ],
    }) as unknown as IMealPreferenceWithUser[]; 
  }

  async getByMealSession({
    tenantId,
  }: IGetMealPreferencesBySession) {
    return this.findAll({
      where: {
        tenantId,
        isActive: true,
      },
    });
  }
}

export const mealPreferenceRepository = new MealPreferencRepository();
