import User from "../user/user.model.js";
import Tenant from "./tenant.model.js";

export const initTenantAssociations = () => {
  Tenant.hasMany(User, {
    foreignKey: "tenantId",
    as: "users",
  });

  User.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });
};
