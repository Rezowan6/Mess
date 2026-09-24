import { MealSession, Tenant, User } from "@/models/index.js";
import { Egg } from "./egg.model.js";

export const setupEggAssociations = () => {
  Egg.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Egg.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  Egg.belongsTo(User, {
    foreignKey: "memberId",
    as: "member",
  });

  Egg.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  Tenant.hasMany(Egg, {
    foreignKey: "tenantId",
    as: "eggs",
  });

  MealSession.hasMany(Egg, {
    foreignKey: "mealSessionId",
    as: "eggs",
  });

  User.hasMany(Egg, {
    foreignKey: "memberId",
    as: "eggRecords",
  });

  User.hasMany(Egg, {
    foreignKey: "createdBy",
    as: "createdEggs",
  });
};
