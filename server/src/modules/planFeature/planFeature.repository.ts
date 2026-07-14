import { BaseRepository } from "@/common/base.repository.js";

import { PlanFeature } from "./planFeature.model.js";

class PlanFeatureRepository extends BaseRepository<PlanFeature> {
  constructor() {
    super(PlanFeature);
  }

  async findByPlanAndFeature(planId: number, featureId: number) {
    return this.findOne({
      planId,
      featureId,
    });
  }

  async findByPlanId(planId: number) {
    return this.findAll({
      where: {
        planId,
      },
    });
  }

  async deleteByPlanAndFeature(planId: number, featureId: number) {
    return this.delete({
      planId,
      featureId,
    });
  }
}

export const planFeatureRepository = new PlanFeatureRepository();
