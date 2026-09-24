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

    return await eggRepository.createEgg(data);
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
      throw new ApiError(404, "Egg record not found.");
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

    await eggRepository.updateEgg(id, tenantId, mealSessionId, data);

    return await eggRepository.getEggByDate(
      tenantId,
      mealSessionId,
      memberId,
      eggDate,
    );
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
      throw new ApiError(404, "Egg record not found.");
    }

    if (!isWithinHours(egg.createdAt, 24)) {
      throw new ApiError(
        409,
        "This egg record can no longer be deleted because the 24-hour deletion period has expired.",
      );
    }

    await eggRepository.deleteEgg(id, tenantId, mealSessionId);

    return null;
  }
}

export const eggService = new EggService();
