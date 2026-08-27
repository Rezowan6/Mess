import { IRegisterPayload } from "../auth/auth.interface.js";
import { ICreateUserResponse } from "./user.interface.js";
import { userRepository } from "./user.repository.js";

class UserService {
  async create(data: IRegisterPayload): Promise<ICreateUserResponse> {
    const user = await userRepository.create({
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
  }
  async getUserById(userId: number) {
    return userRepository.findById(userId);
  }

  async updateAvatar(userId: number, avatar: string) {
    return userRepository.updateAvatar(userId, avatar);
  }
}

export const userService = new UserService();
