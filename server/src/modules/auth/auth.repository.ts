import User from "../user/user.model.js";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const deleteUserById = async (id: string) => {
  return await User.destroy({ where: { id } });
};
