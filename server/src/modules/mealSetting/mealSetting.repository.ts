import { BaseRepository } from "@/common/repo/base.repository.js";
import { MealSetting } from "./mealSetting.model.js";

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
}

export const mealSettingRepository = new MealSettingRepository();
