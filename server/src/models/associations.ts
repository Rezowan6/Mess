import {
  Invite,
  MealEntry,
  MealSession,
  RefreshToken,
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

  TenantMembership.belongsTo(User, { foreignKey: "invitedBy", as: "inviter" });

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
    as: "mealsession",
  });


  MealEntry.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant"
  })

  Tenant.hasMany(MealEntry, {
    foreignKey: "tenantId",
    as: "mealEntries"
  });

  MealEntry.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasMany(MealEntry, {
    foreignKey: "userId",
    as: "mealEntries"
  });

  MealEntry.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(MealEntry, {
    foreignKey: "mealSessionId",
    as: "mealEntries",
  })
};
