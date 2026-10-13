import { MealSetting, Tenant } from "@/models/index.js";

export const setupMealSettingAssociations = () => {
  Tenant.hasOne(MealSetting, {
    foreignKey: "tenantId",
    as: "mealSetting",
  });

  MealSetting.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });
};