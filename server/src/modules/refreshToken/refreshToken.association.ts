import { RefreshToken, User } from "@/models/index.js";

export const setupRefreshTokenAssociations = () => {
  User.hasMany(RefreshToken, {
    foreignKey: "userId",
    as: "refreshTokens",
  });

  RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};