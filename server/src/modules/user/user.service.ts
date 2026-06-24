import { hashPassword } from "@/utils/bcrypt.js";
import { createUser } from "./user.repository.js";

export const createAdminUserService = async (data: any, transaction: any) => {
  const password = await hashPassword(data.password);

  const user = await createUser(
    {
      name: data.name,
      email: data.email,
      password,
      role: "admin",
      isActive: false,
      tenantId: data.tenantId,
    },
    {
      transaction,
    },
  );

  return user;
};
