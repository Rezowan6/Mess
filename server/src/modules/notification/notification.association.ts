import { MealSession, Notification, Tenant, User } from "@/models/index.js";

export const setupNotificationAssociations = () => {
  // Receiver
  Notification.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // Who generated the notification
  Notification.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  // Tenant
  Notification.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  // Meal Session
  Notification.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  // Tenant -> Notifications
  Tenant.hasMany(Notification, {
    foreignKey: "tenantId",
    as: "notifications",
  });

  // Meal Session -> Notifications
  MealSession.hasMany(Notification, {
    foreignKey: "mealSessionId",
    as: "notifications",
  });
};
