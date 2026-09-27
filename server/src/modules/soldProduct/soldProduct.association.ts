import { MealSession, Tenant, User } from "@/models/index.js";

import { SoldProduct } from "./soldProduct.model.js";

export const setupSoldProductAssociations = () => {
  SoldProduct.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  SoldProduct.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  SoldProduct.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  Tenant.hasMany(SoldProduct, {
    foreignKey: "tenantId",
    as: "soldProducts",
  });

  MealSession.hasMany(SoldProduct, {
    foreignKey: "mealSessionId",
    as: "soldProducts",
  });

  User.hasMany(SoldProduct, {
    foreignKey: "createdBy",
    as: "createdSoldProducts",
  });
};
