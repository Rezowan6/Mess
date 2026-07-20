// plan.repository.ts

import { BaseRepository } from "@/common/repo/base.repository.js";

import { Plan } from "./plan.model.js";

class PlanRepository extends BaseRepository<Plan> {
  constructor() {
    super(Plan);
  }

  async findBySlug(slug: string): Promise<Plan | null> {
    return this.findOne({
      slug,
    });
  }

  async findActivePlans(): Promise<Plan[]> {
    return this.findAll({
      where: {
        isActive: true,
      },

      order: [["createdAt", "DESC"]],
    });
  }
}

export const planRepository = new PlanRepository();
