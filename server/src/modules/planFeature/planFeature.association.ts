import { Feature, Plan, PlanFeature } from "@/models/index.js";

export const setupPlanFeatureAssociations = () => {
  Feature.hasMany(PlanFeature, {
    foreignKey: "featureId",
    as: "planFeatures",
  });

  PlanFeature.belongsTo(Plan, {
    foreignKey: "planId",
    as: "plan",
  });

  PlanFeature.belongsTo(Feature, {
    foreignKey: "featureId",
    as: "feature",
  });

  Plan.belongsToMany(Feature, {
    through: PlanFeature,
    foreignKey: "planId",
    otherKey: "featureId",
    as: "features",
  });

  Feature.belongsToMany(Plan, {
    through: PlanFeature,
    foreignKey: "featureId",
    otherKey: "planId",
    as: "plans",
  });
};