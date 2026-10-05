import { ApiError } from "@/utils/ApiError.js";
import { eggRepository } from "../egg/egg.repository.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { ICreateEggRateDto, IUpdateEggRateDto } from "./eggRate.interface.js";
import { eggRateRepository } from "./eggRate.repository.js";

import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";

class EggRateService {
  async create(data: ICreateEggRateDto) {
    const { tenantId, mealSessionId, rate } = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    if (rate <= 0) {
      throw new ApiError(400, "Egg rate must be greater than zero.");
    }

    const existingEggRate = await eggRateRepository.getEggRate(
      tenantId,
      mealSessionId,
    );

    if (existingEggRate) {
      throw new ApiError(409, "Egg rate already exists for this tenant.");
    }

    await eggRateRepository.createEggRate(data);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.EGG_RATE,
      action: RealtimeAction.CREATED,
      tenantId,
      mealSessionId,
    });
  }

  async get({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    const eggRate = await eggRateRepository.getEggRate(tenantId, mealSessionId);

    return eggRate;
  }

  async update({
    tenantId,
    mealSessionId,
    data,
  }: {
    tenantId: number;
    mealSessionId: number;
    data: IUpdateEggRateDto;
  }) {
    const eggRate = await eggRateRepository.getEggRate(tenantId, mealSessionId);

    if (!eggRate) {
      throw new ApiError(404, "Egg rate not found.");
    }

    if (data.rate !== undefined && data.rate <= 0) {
      throw new ApiError(400, "Egg rate must be greater than zero.");
    }

    await eggRateRepository.updateEggRate(tenantId, mealSessionId, {rate: data.rate});

    await eggRateRepository.getEggRate(tenantId, mealSessionId);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.EGG_RATE,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async delete({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    const eggRate = await eggRateRepository.getEggRate(tenantId, mealSessionId);

    if (!eggRate) {
      throw new ApiError(404, "Egg rate not found.");
    }

    const hasEggEntries = await eggRepository.existsByMealSession(
      tenantId,
      mealSessionId,
    );

    if (hasEggEntries) {
      throw new ApiError(
        400,
        "Egg rate cannot be deleted because member egg entries already exist for this meal session.",
      );
    }

    await eggRateRepository.deleteEggRate(tenantId, mealSessionId);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.EGG_RATE,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
    });

    return null;
  }
}

export const eggRateService = new EggRateService();
