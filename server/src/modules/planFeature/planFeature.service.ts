import { ApiError } from "@/utils/ApiError.js";

import { featureRepository } from "../feature/feature.repository.js";
import { planRepository } from "../plan/plan.repository.js";

import { PlanFeature } from "./planFeature.model.js";
import { planFeatureRepository } from "./planFeature.repository.js";

import {
  ICreatePlanFeatureInput,
  IUpdatePlanFeatureInput,
} from "./planFeature.interface.js";

export class PlanFeatureService {
  async create(payload: ICreatePlanFeatureInput): Promise<PlanFeature> {
    const plan = await planRepository.findById(payload.planId);

    if (!plan) {
      throw new ApiError(404, "Plan not found.");
    }

    const feature = await featureRepository.findById(payload.featureId);

    if (!feature) {
      throw new ApiError(404, "Feature not found.");
    }

    const existing = await planFeatureRepository.findByPlanAndFeature(
      payload.planId,
      payload.featureId,
    );

    if (existing) {
      throw new ApiError(409, "Feature already assigned to this plan.");
    }

    return planFeatureRepository.create(payload);
  }

  async getAll() {
    return planFeatureRepository.findAll();
  }

  async getById(id: number) {
    const planFeature = await planFeatureRepository.findById(id);

    if (!planFeature) {
      throw new ApiError(404, "Plan feature not found.");
    }

    return planFeature;
  }

  async getByPlanId(planId: number) {
    return planFeatureRepository.findByPlanId(planId);
  }

  async update(id: number, payload: IUpdatePlanFeatureInput) {
    await this.getById(id);

    await planFeatureRepository.update({ id }, payload);

    return this.getById(id);
  }

  async delete(id: number) {
    const planFeature = await this.getById(id);

    await planFeatureRepository.delete({
      id: planFeature.id,
    });
  }
}
