import {User} from "@/models/index.js";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const deleteUserById = async (id: string) => {
  return await User.destroy({ where: { id } });
};
