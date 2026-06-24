import RefreshToken from "./refreshToken.model.js";
import User from "../user/user.model.js";

export const initAuthAssociations = () => {
  RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};