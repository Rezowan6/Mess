import { Invite, Membership, RefreshToken, Tenant, User } from "./index.js";

export const setupAssociations = () => {
  User.hasMany(Membership, {
    foreignKey: "userId",
    as: "tenantMemberships",
  });

  Membership.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Membership.belongsTo(User, { foreignKey: "invitedBy", as: "inviter" });

  Membership.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(Membership, {
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
    through: Membership,
    foreignKey: "userId",
    otherKey: "tenantId",
    as: "tenants",
  });

  Tenant.belongsToMany(User, {
    through: Membership,
    foreignKey: "tenantId",
    otherKey: "userId",
    as: "members",
  });
};
