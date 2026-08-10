import { ApiError } from "@/utils/ApiError.js";

import { planRepository } from "./plan.repository.js";

import { Plan } from "./plan.model.js";

import { ICreatePlanInput, IUpdatePlanInput } from "./plan.interface.js";

export class PlanService {
  // Create Plan
  async create(payload: ICreatePlanInput): Promise<Plan> {
    const existingPlan = await planRepository.findBySlug(payload.slug);

    if (existingPlan) {
      throw new ApiError(409, "Plan already exists with this slug.");
    }

    const plan = await planRepository.create(payload);

    return plan;
  }

  // Get All Plans
  async getAll(): Promise<Plan[]> {
    return planRepository.findPlansWithFeatures();
  }

  // Get Active Plans
  async getActivePlans(): Promise<Plan[]> {
    return planRepository.findAll({
      where: {
        isActive: true,
      },

      order: [["createdAt", "DESC"]],
    });
  }

  // Get Single Plan
  async getById(id: number): Promise<Plan> {
    const plan = await planRepository.findById(id);

    if (!plan) {
      throw new ApiError(404, "Plan not found.");
    }

    return plan;
  }

  // Update Plan
  async update(id: number, payload: IUpdatePlanInput): Promise<Plan> {
    const plan = await this.getById(id);

    // slug change করলে duplicate check
    if (payload.slug && payload.slug !== plan.slug) {
      const existingPlan = await planRepository.findBySlug(payload.slug);

      if (existingPlan) {
        throw new ApiError(409, "Plan slug already exists.");
      }
    }

    await planRepository.update(
      {
        id,
      },
      payload,
    );

    const updatedPlan = await this.getById(id);

    return updatedPlan;
  }

  // Soft Delete / Deactivate Plan
  async delete(id: number): Promise<void> {
    const plan = await this.getById(id);

    await planRepository.update(
      {
        id: plan.id,
      },
      {
        isActive: false,
      },
    );
  }
}
