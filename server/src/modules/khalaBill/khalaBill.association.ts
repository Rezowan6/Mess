import { KhalaBill, Tenant, User } from "@/models/index.js";

export const setupKhalaBillAssociations = () => {
  KhalaBill.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(KhalaBill, {
    foreignKey: "tenantId",
    as: "khalaBills",
  });

  KhalaBill.belongsTo(User, {
    foreignKey: "userId",
    as: "member",
  });

  User.hasMany(KhalaBill, {
    foreignKey: "userId",
    as: "khalaBills",
  });

  KhalaBill.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  User.hasMany(KhalaBill, {
    foreignKey: "createdBy",
    as: "createdKhalaBills",
  });
};
