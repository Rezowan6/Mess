import { BaseRepository } from "@/common/repo/base.repository.js";
import { MealSetting } from "./mealSetting.model.js";
import { ApiError } from "@/utils/ApiError.js";

class MealSettingRepository extends BaseRepository<MealSetting> {
  constructor() {
    super(MealSetting);
  }

  async getByTenantId(tenantId: number): Promise<MealSetting | null> {
    return this.findOne({
      tenantId,
    });
  }

  async updateByTenantId(
    tenantId: number,
    payload: Partial<MealSetting>,
  ): Promise<[affectedCount: number]> {
    return this.update(
      {
        tenantId,
      },
      payload,
    );
  }

  async getRequiredByTenantId(tenantId: number): Promise<MealSetting> {
    const setting = await this.getByTenantId(tenantId);

    if (!setting) {
      throw new ApiError(404, "Meal setting not configured for this tenant");
    }

    return setting;
  }

  
}

export const mealSettingRepository = new MealSettingRepository();
