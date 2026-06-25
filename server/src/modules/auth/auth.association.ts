import RefreshToken from "../refreshToken/refreshToken.model.js";
import User from "../user/user.model.js";

export const initAuthAssociations = () => {
  RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};
