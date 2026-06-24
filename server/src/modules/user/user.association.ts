import User from "./user.model.js";
import Tenant from "../tenant/tenant.model.js";
import RefreshToken from "../auth/refreshToken.model.js";

export const initUserAssociations = () => {
  User.belongsTo(User, {
    as: "admin",
    foreignKey: "tenantId",
  });

  User.belongsTo(User, {
    as: "creator",
    foreignKey: "createdBy",
  });

  User.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  User.hasMany(RefreshToken, {
    foreignKey: "userId",
    as: "refreshTokens",
  });
};