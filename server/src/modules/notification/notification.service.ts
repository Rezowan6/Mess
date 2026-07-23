import { ApiError } from "@/utils/ApiError.js";

import { IPaginationQuery } from "@/common/types/pagination.interface.js";

import { SocketRoom } from "@/helpers/socket-room.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { notificationRepository } from "./notification.repository.js";

class NotificationService {
  /**
   * Internal use only
   * Expense, Payment, Invite, Meal Request ইত্যাদি module থেকে call হবে
   */
  async create(
    tenantId: number,
    userId: number,
    createdBy: number,
    payload: {
      title: string;
      message: string;
      type: string;
    },
  ) {
    const notification = await notificationRepository.create({
      ...payload,
      tenantId,
      userId,
      createdBy,
    });

    socketService.emitToUser(userId, SocketEvent.NOTIFICATION, notification);

    return notification;
  }

  async getAll(tenantId: number, userId: number, pagination: IPaginationQuery) {
    return await notificationRepository.getAll(tenantId, userId, pagination);
  }

  async getUnreadCount(tenantId: number, userId: number) {
    const count = await notificationRepository.getUnreadCount(tenantId, userId);

    return {
      count,
    };
  }

  async findById(id: number, tenantId: number, userId: number) {
    const notification = await notificationRepository.getById(
      id,
      tenantId,
      userId,
    );

    if (!notification) {
      throw new ApiError(404, "Notification not found.");
    }

    return notification;
  }

  async markAsRead(id: number, tenantId: number, userId: number) {
    await this.findById(id, tenantId, userId);

    await notificationRepository.markAsRead(id, tenantId, userId);

    return null;
  }

  async markAllAsRead(tenantId: number, userId: number) {
    await notificationRepository.markAllAsRead(tenantId, userId);

    return null;
  }

  async delete(id: number, tenantId: number, userId: number) {
    await this.findById(id, tenantId, userId);

    await notificationRepository.remove(id, tenantId, userId);

    return null;
  }
}

export const notificationService = new NotificationService();
