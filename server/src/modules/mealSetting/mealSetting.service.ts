import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
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

    const result = await mealSettingRepository.create(payload);

    socketService.emitToTenant(payload.tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.MEAL_SETTING,
      action: RealtimeAction.CREATED,
      tenantId: payload.tenantId,
    });

    return result;
  }

  async getMySetting(tenantId: number) {
    const setting = await mealSettingRepository.getByTenantId(tenantId);

    return setting;
  }

  async update(tenantId: number, payload: IUpdateMealSettingDto) {
    const existingSetting = await mealSettingRepository.getByTenantId(tenantId);

    if (!existingSetting) {
      throw new ApiError(404, "Meal setting not found");
    }
    await mealSettingRepository.updateByTenantId(tenantId, payload);

    await mealSettingRepository.getByTenantId(tenantId);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.MEAL_SETTING,
      action: RealtimeAction.UPDATED,
      tenantId: tenantId,
    });

    return null;
  }
}

export const mealSettingService = new MealSettingService();
