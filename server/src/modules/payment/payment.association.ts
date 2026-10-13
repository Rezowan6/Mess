import { Payment, Subscription, Tenant } from "@/models/index.js";

export const setupPaymentAssociations = () => {
  Tenant.hasMany(Payment, {
    foreignKey: "tenantId",
    as: "payments",
  });

  Payment.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Subscription.hasMany(Payment, {
    foreignKey: "subscriptionId",
    as: "payments",
  });

  Payment.belongsTo(Subscription, {
    foreignKey: "subscriptionId",
    as: "subscription",
  });
};