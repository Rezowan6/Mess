import { Tenant, TenantMembership, User } from "@/models/index.js";

export const setupTenantMembershipAssociations = () => {
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
};
