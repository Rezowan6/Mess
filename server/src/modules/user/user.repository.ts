import { User } from "@/models/index.js";
import { Transaction } from "sequelize";
import { CreateUserPayload } from "./user.interface.js";

export const createUser = async (data: CreateUserPayload): Promise<User> => {
  return await User.create(data as any);
};

export const findByEmail = async (email: string) => {
  return (await User.findOne({ where: { email } })) || null;
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
