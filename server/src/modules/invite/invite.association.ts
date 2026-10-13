import { Invite, Tenant, User } from "@/models/index.js";

export const setupInviteAssociations = () => {
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
};