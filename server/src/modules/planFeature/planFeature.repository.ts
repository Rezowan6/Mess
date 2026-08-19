import { BaseRepository } from "@/common/repo/base.repository.js";

import { Feature } from "@clerk/express";
import { PlanFeature } from "./planFeature.model.js";

type PlanFeatureWithFeature = PlanFeature & {
  feature?: Feature;
};

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

  async findByPlanId(planId: number): Promise<PlanFeatureWithFeature[]> {
    return this.findAll({
      where: {
        planId,
      },
      include: [
        {
          association: "feature",
        },
      ],
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
