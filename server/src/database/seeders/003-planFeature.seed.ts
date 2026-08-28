import { Feature, Plan, PlanFeature } from "@/models/index.js";

export async function seedPlanFeatures() {
  const plans = await Plan.findAll();

  const features = await Feature.findAll();

  const premium = plans.find((plan) => plan.slug === "premium");

  const Standard = plans.find((plan) => plan.slug === "Standard");

  const free = plans.find((plan) => plan.slug === "free");

  const dashboard = features.find((feature) => feature.slug === "dashboard");

  const advancedReport = features.find(
    (feature) => feature.slug === "advanced_report",
  );

  const exportReport = features.find(
    (feature) => feature.slug === "export_report",
  );

  const unlimitedMember = features.find(
    (feature) => feature.slug === "unlimited_member",
  );

  if (
    !premium ||
    !Standard ||
    !free ||
    !dashboard ||
    !advancedReport ||
    !exportReport ||
    !unlimitedMember
  ) {
    throw new Error(
      "Plan or Feature data missing. Run plan and feature seed first.",
    );
  }

  const planFeatures = [
    // Free
    {
      planId: free.id,
      featureId: dashboard.id,
      value: "true",
    },

    // Basic
    {
      planId: Standard.id,
      featureId: dashboard.id,
      value: "true",
    },

    {
      planId: Standard.id,
      featureId: advancedReport.id,
      value: "true",
    },

    // Premium
    {
      planId: premium.id,
      featureId: dashboard.id,
      value: "true",
    },

    {
      planId: premium.id,
      featureId: advancedReport.id,
      value: "true",
    },

    {
      planId: premium.id,
      featureId: exportReport.id,
      value: "true",
    },

    {
      planId: premium.id,
      featureId: unlimitedMember.id,
      value: "true",
    },
  ];

  for (const item of planFeatures) {
    await PlanFeature.upsert(item);
  }

  console.log("✅ Plan features seeded successfully");
}
