import { MealPreference, MealSession, Tenant, User } from "@/models/index.js";

export const setupMealPreferenceAssociations = () => {
  User.hasOne(MealPreference, {
    foreignKey: "userId",
    as: "mealPreference",
  });

  MealPreference.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Tenant.hasMany(MealPreference, {
    foreignKey: "tenantId",
    as: "mealPreferences",
  });

  MealPreference.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  MealSession.hasMany(MealPreference, {
    foreignKey: "mealSessionId",
    as: "mealPreferences",
  });

  MealPreference.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });
};