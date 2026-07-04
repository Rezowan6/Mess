import { RegisterPayload } from "../auth/auth.interface.js";
import { CreateUserResponse } from "./user.interface.js";
import { createUser } from "./user.repository.js";

export const createRegisterService = async (
  data: RegisterPayload,
): Promise<CreateUserResponse> => {
  const user = await createUser({
    name: data?.name,
    email: data.email,
    password: data.password,
    isVerified: false,
    status: "active",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
    status: user.status,
  };
};
