import { User } from "@/models/index.js";
import { Transaction } from "sequelize";
import { IUserAttributes } from "./user.interface.js";

export const createUser = async (
  data: Partial<IUserAttributes>,
  options?: { transaction?: Transaction },
) => {
  return await User.create(data as any, options);
};
