import { MealEntry, MealRequest, MealSession, Tenant, User } from "@/models/index.js";

export const setupMealEntryAssociations = () => {
  MealEntry.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(MealEntry, {
    foreignKey: "tenantId",
    as: "mealEntries",
  });

  MealEntry.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasMany(MealEntry, {
    foreignKey: "userId",
    as: "mealEntries",
  });

  MealEntry.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(MealEntry, {
    foreignKey: "mealSessionId",
    as: "mealEntries",
  });

  MealEntry.belongsTo(MealRequest, {
    foreignKey: "mealRequestId",
    as: "mealRequest",
  });

  MealRequest.hasOne(MealEntry, {
    foreignKey: "mealRequestId",
    as: "MealEntry",
  });
};