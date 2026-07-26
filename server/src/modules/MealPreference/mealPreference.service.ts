import { checkMealCutoff } from "@/helpers/checkMealCutoff.helper.js";
import { ApiError } from "@/utils/ApiError.js";
import { mealSettingRepository } from "../mealSetting/mealSetting.repository.js";
import { IUpsertPayload } from "./mealPreference.interface.js";
import { mealPreferenceRepository } from "./mealPreference.repository.js";

class MealPreferenceService {
  async upsert({ tenantId, userId, payload }: IUpsertPayload) {
    const { breakfast, lunch, dinner, guestMeal } = payload;

    const existingPreference = await mealPreferenceRepository.findOne({
      tenantId,
      userId,
    });

    const mealSetting = await mealSettingRepository.findOne({
      tenantId,
    });

    if (!mealSetting) {
      throw new ApiError(404, "Meal setting not found");
    }

    /**
     * First time create
     */
    if (!existingPreference) {
      return await mealPreferenceRepository.create({
        tenantId,
        userId,

        breakfast,
        lunch,
        dinner,
        guestMeal: guestMeal ?? 0,

        isActive: true,
      });
    }

    /**
     * Check ON OFF action
     */ if (existingPreference.breakfast !== breakfast) {
      checkMealCutoff({
        mealSetting,
        meal: "breakfast",
      });
    }

    if (existingPreference.lunch !== lunch) {
      checkMealCutoff({
        mealSetting,
        meal: "lunch",
      });
    }

    if (existingPreference.dinner !== dinner) {
      checkMealCutoff({
        mealSetting,
        meal: "dinner",
      });
    }

    /**
     * Update preference
     */
    return await mealPreferenceRepository.update(
      { id: existingPreference.id },
      {
        breakfast,
        lunch,
        dinner,
        guestMeal: guestMeal ?? 0,
      },
    );
  }

  async getMyPreference({
    tenantId,
    userId,
  }: {
    tenantId: number;
    userId: number;
  }) {
    return await mealPreferenceRepository.getMyPreference({
      tenantId,
      userId,
    });
  }
}

export const mealPreferenceService = new MealPreferenceService();
