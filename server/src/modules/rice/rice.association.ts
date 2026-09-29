import { MealSession, Tenant, User } from "@/models/index.js";

import { Rice } from "./rice.model.js";

export const setupRiceAssociations = () => {
  Rice.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Rice.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  Rice.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  Tenant.hasMany(Rice, {
    foreignKey: "tenantId",
    as: "ricePurchases",
  });

  MealSession.hasMany(Rice, {
    foreignKey: "mealSessionId",
    as: "ricePurchases",
  });

  User.hasMany(Rice, {
    foreignKey: "createdBy",
    as: "createdRicePurchases",
  });
};
