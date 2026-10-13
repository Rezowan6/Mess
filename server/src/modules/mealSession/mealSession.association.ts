import { MealSession, Tenant } from "@/models/index.js";

export const setupMealSessionAssociations = () => {
  MealSession.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(MealSession, {
    foreignKey: "tenantId",
    as: "mealSessions",
  });
};