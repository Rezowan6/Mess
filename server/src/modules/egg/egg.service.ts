import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import { isWithinHours } from "@/utils/date.util.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { ICreateEggDto, IUpdateEggDto } from "./egg.interface.js";
import { eggRepository } from "./egg.repository.js";

class EggService {
  async create(data: ICreateEggDto) {
    const { tenantId, mealSessionId, memberId, eggDate, quantity } = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    if (quantity <= 0) {
      throw new ApiError(400, "Egg quantity must be greater than zero.");
    }

    const existingEgg = await eggRepository.getEggByDate(
      tenantId,
      mealSessionId,
      memberId,
      eggDate,
    );

    if (existingEgg) {
      throw new ApiError(
        409,
        "Egg record already exists for this member on this date.",
      );
    }

    const result = await eggRepository.createEgg(data);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.EGG,
      action: RealtimeAction.CREATED,
      tenantId,
      mealSessionId,
    });

    return result;
  }

  async getMemberEggs({
    tenantId,
    mealSessionId,
    memberId,
  }: {
    tenantId: number;
    mealSessionId: number;
    memberId: number;
  }) {
    const eggs = await eggRepository.getMemberEggs(
      tenantId,
      mealSessionId,
      memberId,
    );

    if (!eggs.length) {
      throw new ApiError(404, "No egg records found.");
    }

    return eggs;
  }
  async getEggSummary({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    const eggs = await eggRepository.getEggSummary(tenantId, mealSessionId);

    if (!eggs.length) {
      throw new ApiError(404, "No egg summary found.");
    }

    return eggs;
  }

  async getAllEggs({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    return await eggRepository.getAllEggs(tenantId, mealSessionId);
  }

  async update({
    id,
    tenantId,
    mealSessionId,
    memberId,
    eggDate,
    data,
  }: {
    id: number;
    tenantId: number;
    mealSessionId: number;
    memberId: number;
    eggDate: Date;
    data: IUpdateEggDto;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const egg = await eggRepository.getEggByDate(
      tenantId,
      mealSessionId,
      memberId,
      eggDate,
    );

    if (!egg || egg.id !== id) {
      throw new ApiError(
        404,
        "Past egg records can’t be updated. You can only update today’s egg record.",
      );
    }

    if (data.quantity !== undefined && data.quantity <= 0) {
      throw new ApiError(400, "Egg quantity must be greater than zero.");
    }

    if (!isWithinHours(egg.createdAt, 24)) {
      throw new ApiError(
        409,
        "This egg record can only be updated within 24 hours of creation.",
      );
    }

    await eggRepository.updateEgg(id, tenantId, mealSessionId, {
      quantity: data.quantity,
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.EGG,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async delete({
    id,
    tenantId,
    mealSessionId,
    memberId,
    eggDate,
  }: {
    id: number;
    tenantId: number;
    mealSessionId: number;
    memberId: number;
    eggDate: Date;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const egg = await eggRepository.getEggByDate(
      tenantId,
      mealSessionId,
      memberId,
      eggDate,
    );

    if (!egg || egg.id !== id) {
      throw new ApiError(
        404,
        "Past egg records can’t be deleted. You can only delete today’s egg record.",
      );
    }

    if (!isWithinHours(egg.createdAt, 24)) {
      throw new ApiError(
        409,
        "This egg record can no longer be deleted because the 24-hour deletion period has expired.",
      );
    }

    await eggRepository.deleteEgg(id, tenantId, mealSessionId);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.EGG,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
    });

    return null;
  }
}

export const eggService = new EggService();
