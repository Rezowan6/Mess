import { Plan, Subscription, Tenant } from "@/models/index.js";

export const setupSubscriptionAssociations = () => {
  Tenant.hasMany(Subscription, {
    foreignKey: "tenantId",
    as: "subscriptions",
  });

  Subscription.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Plan.hasMany(Subscription, {
    foreignKey: "planId",
    as: "subscriptions",
  });

  Subscription.belongsTo(Plan, {
    foreignKey: "planId",
    as: "plan",
  });
};