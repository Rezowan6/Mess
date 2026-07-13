import { Feature, Plan, PlanFeature } from "@/models/index.js";

export async function seedPlanFeatures() {
  const premium = await Plan.findOne({
    where: {
      slug: "premium",
    },
  });

  const dashboard = await Feature.findOne({
    where: {
      slug: "dashboard",
    },
  });

  if (premium && dashboard) {
    await PlanFeature.create({
      planId: premium.id,

      featureId: dashboard.id,

      value: "true",
    });
  }
}
