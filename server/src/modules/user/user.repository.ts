import { User } from "@/models/index.js";
import { Transaction } from "sequelize";
import { CreateUserPayload } from "./user.interface.js";

export const createUser = async (data: CreateUserPayload, transaction: Transaction | null = null): Promise<User> => {
  return await User.create(data, {transaction: transaction ?? null});
};

export const findByEmail = async (email: string, transaction: Transaction | null = null) => {
  return (await User.findOne({ where: { email }, transaction: transaction ?? null})) ?? null;
};
export const findById = async (id: number) => {
  return User.findByPk(id);
};

export const update = async (
  user: User,
  data: Partial<User>,
  transaction: Transaction | null = null,
) => {
  Object.assign(user, data);
  return user.save({ transaction: transaction ?? null });
};
