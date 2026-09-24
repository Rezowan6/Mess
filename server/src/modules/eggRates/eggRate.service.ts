import { ApiError } from "@/utils/ApiError.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { ICreateEggRateDto, IUpdateEggRateDto } from "./eggRate.interface.js";
import { eggRateRepository } from "./eggRate.repository.js";

class EggRateService {
  async create(data: ICreateEggRateDto) {
    const { tenantId, mealSessionId, rate } = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    if (rate <= 0) {
      throw new ApiError(400, "Egg rate must be greater than zero.");
    }

    const existingEggRate = await eggRateRepository.getEggRate(tenantId, mealSessionId);

    if (existingEggRate) {
      throw new ApiError(409, "Egg rate already exists for this tenant.");
    }

    return await eggRateRepository.createEggRate(data);
  }

  async get({
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

    await eggRateRepository.updateEggRate(tenantId, mealSessionId, data);

    return await eggRateRepository.getEggRate(tenantId, mealSessionId);
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

    await eggRateRepository.deleteEggRate(tenantId, mealSessionId);

    return null;
  }
}

export const eggRateService = new EggRateService();
