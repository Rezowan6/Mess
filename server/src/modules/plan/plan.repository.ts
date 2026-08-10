// plan.repository.ts

import { BaseRepository } from "@/common/repo/base.repository.js";

import { Plan } from "./plan.model.js";
import { Feature } from '@/models/index.js';

class PlanRepository extends BaseRepository<Plan> {
  constructor() {
    super(Plan);
  }

  async findPlansWithFeatures() {
    return this.findAll({
      include: [
        {
          model: Feature,
          as: "features",
          through: {
            attributes: ["value"],
          },
        },
      ],
    });
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
