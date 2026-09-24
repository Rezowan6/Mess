import { MealSession, Tenant, User } from "@/models/index.js";
import { EggRate } from "./eggRate.model.js";

export const setupEggRateAssociations = () => {
  EggRate.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  EggRate.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  EggRate.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  Tenant.hasMany(EggRate, {
    foreignKey: "tenantId",
    as: "eggRates",
  });

  MealSession.hasMany(EggRate, {
    foreignKey: "mealSessionId",
    as: "eggRates",
  });

  User.hasMany(EggRate, {
    foreignKey: "createdBy",
    as: "createdEggRates",
  });
};
