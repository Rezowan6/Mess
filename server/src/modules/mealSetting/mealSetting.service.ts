import { ApiError } from "@/utils/ApiError.js";
import {
  ICreateMealSettingDto,
  IUpdateMealSettingDto,
} from "./mealSetting.interface.js";
import { MealSetting } from "./mealSetting.model.js";
import { mealSettingRepository } from "./mealSetting.repository.js";

class MealSettingService {
  async create(payload: ICreateMealSettingDto): Promise<MealSetting> {
    const existingSetting = await mealSettingRepository.getByTenantId(
      payload.tenantId,
    );

    if (existingSetting) {
      throw new ApiError(409, "Meal setting already exists for this tenant");
    }

    return mealSettingRepository.create(payload);
  }

  async getMySetting(tenantId: number) {
    const setting = await mealSettingRepository.getByTenantId(tenantId);

    if (!setting) {
      throw new ApiError(404, "Meal setting not found.");
    }

    return setting;
  }

  async update(
    tenantId: number,
    payload: IUpdateMealSettingDto,
  ): Promise<MealSetting> {
    const existingSetting = await mealSettingRepository.getByTenantId(tenantId);

    if (!existingSetting) {
      throw new ApiError(404, "Meal setting not found");
    }
    await mealSettingRepository.updateByTenantId(tenantId, payload);

    const updateSetting = await mealSettingRepository.getByTenantId(tenantId);

    return updateSetting as MealSetting;
  }

  async delete(tenantId: number): Promise<void> {
    const existingSetting = await mealSettingRepository.getByTenantId(tenantId);

    if (!existingSetting) {
      throw new ApiError(404, "Meal setting not found");
    }

    await mealSettingRepository.delete({ tenantId });
  }
}

export const mealSettingService = new MealSettingService();
