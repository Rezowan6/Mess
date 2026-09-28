import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { Transaction } from "sequelize";
import { IRegisterPayload } from "../auth/auth.interface.js";
import { ICreateUserResponse } from "./user.interface.js";
import { userRepository } from "./user.repository.js";

class UserService {
  async create(
    data: IRegisterPayload,
    transaction: Transaction | null,
  ): Promise<ICreateUserResponse> {
    const user = await userRepository.createWithOptions(
      {
        name: data?.name,
        email: data.email,
        password: data.password,
        isVerified: false,
        status: "active",
      },
      { transaction },
    );

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

  async updateAvatar(
    tenantId: number,
    userId: number,
    avatar: string,
    avatarPublicId: string,
  ) {
    const result = await userRepository.updateAvatar(
      userId,
      avatar,
      avatarPublicId,
    );

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.MEMBERSHIP,
      action: RealtimeAction.UPDATED,
      tenantId,
    });

    return result;
  }

  deleteUnverifiedInactiveUsers = async () => {
    return await userRepository.delete(
      {
        isVerified: false,
      },
      {
        force: true,
      },
    );
  };
}

export const userService = new UserService();
