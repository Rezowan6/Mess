import {
  Deposit,
  Expenses,
  Feature,
  Invite,
  MealEntry,
  MealPreference,
  MealRequest,
  MealSession,
  MealSetting,
  Notice,
  Notification,
  Payment,
  Plan,
  PlanFeature,
  RefreshToken,
  Subscription,
  Tenant,
  TenantMembership,
  User,
} from "./index.js";

export const setupAssociations = () => {
  User.hasMany(TenantMembership, {
    foreignKey: "userId",
    as: "tenantMemberships",
  });

  TenantMembership.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  TenantMembership.belongsTo(User, {
    foreignKey: "invitedBy",
    as: "inviter",
  });

  TenantMembership.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(TenantMembership, {
    foreignKey: "tenantId",
    as: "memberships",
  });

  Tenant.hasMany(Invite, {
    foreignKey: "tenantId",
    as: "invites",
  });

  Invite.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  User.hasMany(Invite, {
    foreignKey: "createdBy",
    as: "sentInvites",
  });

  Invite.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  User.hasMany(RefreshToken, {
    foreignKey: "userId",
    as: "refreshTokens",
  });

  RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.belongsToMany(Tenant, {
    through: TenantMembership,
    foreignKey: "userId",
    otherKey: "tenantId",
    as: "tenants",
  });

  Tenant.belongsToMany(User, {
    through: TenantMembership,
    foreignKey: "tenantId",
    otherKey: "userId",
    as: "members",
  });

  MealSession.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(MealSession, {
    foreignKey: "tenantId",
    as: "mealSessions",
  });

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

  /** MealRequest */

  MealSession.hasMany(MealEntry, {
    foreignKey: "mealSessionId",
    as: "mealEntries",
  });

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

  MealEntry.belongsTo(MealRequest, {
    foreignKey: "mealRequestId",
    as: "mealRequest",
  });
  MealRequest.hasOne(MealEntry, {
    foreignKey: "mealRequestId",
    as: "MealEntry",
  });

  /* ------ expenses ------- */

  Expenses.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(Expenses, {
    foreignKey: "tenantId",
    as: "expenses",
  });

  Expenses.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  User.hasMany(Expenses, {
    foreignKey: "createdBy",
    as: "createdExpenses",
  });
  Expenses.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(Expenses, {
    foreignKey: "mealSessionId",
    as: "expenses",
  });

  /* ------ Deposit ------- */

  Deposit.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(Deposit, {
    foreignKey: "tenantId",
    as: "deposits",
  });

  Deposit.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  User.hasMany(Deposit, {
    foreignKey: "createdBy",
    as: "createdDeposits",
  });

  Deposit.belongsTo(User, {
    foreignKey: "memberId",
    as: "member",
  });

  User.hasMany(Deposit, {
    foreignKey: "memberId",
    as: "memberDeposits",
  });

  Deposit.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(Deposit, {
    foreignKey: "mealSessionId",
    as: "deposits",
  });

  /** Notice */
  Notice.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });
  User.hasMany(Notice, {
    foreignKey: "createdBy",
    as: "notices",
  });

  Notice.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(Notice, {
    foreignKey: "mealSessionId",
    as: "notices",
  });

  /** Feature */
  Feature.hasMany(PlanFeature, {
    foreignKey: "featureId",
    as: "planFeatures",
  });

  /** PlanFeature */
  PlanFeature.belongsTo(Plan, {
    foreignKey: "planId",
    as: "plan",
  });

  PlanFeature.belongsTo(Feature, {
    foreignKey: "featureId",
    as: "feature",
  });

  Plan.belongsToMany(Feature, {
    through: PlanFeature,
    foreignKey: "planId",
    otherKey: "featureId",
    as: "features",
  });

  Feature.belongsToMany(Plan, {
    through: PlanFeature,
    foreignKey: "featureId",
    otherKey: "planId",
    as: "plans",
  });

  /** Subscriptions */
  // Tenant ↔ Subscription
  Tenant.hasMany(Subscription, {
    foreignKey: "tenantId",
    as: "subscriptions",
  });

  Subscription.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  // Plan ↔ Subscription
  Plan.hasMany(Subscription, {
    foreignKey: "planId",
    as: "subscriptions",
  });

  Subscription.belongsTo(Plan, {
    foreignKey: "planId",
    as: "plan",
  });

  /** Payment */
  Tenant.hasMany(Payment, {
    foreignKey: "tenantId",
    as: "payments",
  });

  Payment.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Subscription.hasMany(Payment, {
    foreignKey: "subscriptionId",
    as: "payments",
  });

  Payment.belongsTo(Subscription, {
    foreignKey: "subscriptionId",
    as: "subscription",
  });

  // notification
  Notification.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Notification.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  Notification.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(Notification, {
    foreignKey: "tenantId",
    as: "notifications",
  });

  /** MealSetting */

  Tenant.hasOne(MealSetting, {
    foreignKey: "tenantId",
    as: "mealSetting",
  });

  MealSetting.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  /** meal_preferences */
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
