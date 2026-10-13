import { MealRequest, MealSession, Tenant, User } from "@/models/index.js";

export const setupMealRequestAssociations = () => {
  MealRequest.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(MealRequest, {
    foreignKey: "tenantId",
    as: "mealRequests",
  });

  MealRequest.belongsTo(User, {
    foreignKey: "userId",
    as: "requester",
  });

  User.hasMany(MealRequest, {
    foreignKey: "userId",
    as: "mealRequests",
  });

  MealRequest.belongsTo(User, {
    foreignKey: "approvedBy",
    as: "approver",
  });

  User.hasMany(MealRequest, {
    foreignKey: "approvedBy",
    as: "approvedMealRequests",
  });

  MealRequest.belongsTo(User, {
    foreignKey: "rejectedBy",
    as: "rejector",
  });

  User.hasMany(MealRequest, {
    foreignKey: "rejectedBy",
    as: "rejectedMealRequests",
  });

  MealRequest.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(MealRequest, {
    foreignKey: "mealSessionId",
    as: "mealRequests",
  });
};