import { MemberShip, Tenant, User } from "./index.js";

export const initAssociations = () => {
  
  User.hasMany(MemberShip, {
    foreignKey: "userId",
    as: "tenantMemberships",
  });

  MemberShip.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Tenant.hasMany(MemberShip, {
    foreignKey: "tenantId",
    as: "memberships",
  });

  MemberShip.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  User.belongsToMany(Tenant, {
    through: MemberShip,
    foreignKey: "userId",
    otherKey: "tenantId",
    as: "tenants",
  });

  Tenant.belongsToMany(User, {
    through: MemberShip,
    foreignKey: "tenantId",
    otherKey: "userId",
    as: "members",
  });
};