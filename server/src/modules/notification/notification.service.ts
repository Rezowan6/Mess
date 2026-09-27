import { ApiError } from "@/utils/ApiError.js";

import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import {
  ICreateNotification,
  INotificationContext,
  INotificationPaginationContext,
} from "./notification.interface.js";
import { notificationRepository } from "./notification.repository.js";

class NotificationService {
  /**
   * Internal use only
   * Expense, Payment, Invite, Meal Request ইত্যাদি module থেকে call হবে
   */
  async create({
    tenantId,
    userId,
    createdBy,
    mealSessionId,
    title,
    message,
    type,
  }: ICreateNotification) {
    const notification = await notificationRepository.create({
      tenantId,
      userId,
      createdBy,
      mealSessionId,
      title,
      message,
      type,
    });

    socketService.emitToUser(userId, SocketEvent.NOTIFICATION, notification);

    return notification;
  }

  async getAll({
    tenantId,
    userId,
    mealSessionId,
    pagination,
  }: INotificationPaginationContext) {
    return await notificationRepository.getAll({
      tenantId,
      userId,
      mealSessionId,
      pagination,
    });
  }

  async getUnreadCount({
    tenantId,
    userId,
    mealSessionId,
  }: INotificationContext) {
    const count = await notificationRepository.getUnreadCount({
      tenantId,
      userId,
      mealSessionId,
    });

    return {
      count,
    };
  }

  async findById(
    id: number,
    { tenantId, userId, mealSessionId }: INotificationContext,
  ) {
    const notification = await notificationRepository.getById(id, {
      tenantId,
      userId,
      mealSessionId,
    });

    if (!notification) {
      throw new ApiError(404, "Notification not found.");
    }

    return notification;
  }

  async markAsRead(
    id: number,
    { tenantId, userId, mealSessionId }: INotificationContext,
  ) {
    await this.findById(id, { tenantId, userId, mealSessionId });

    await notificationRepository.markAsRead(id, {
      tenantId,
      userId,
      mealSessionId,
    });

    return null;
  }

  async markAllAsRead({
    tenantId,
    userId,
    mealSessionId,
  }: INotificationContext) {
    await notificationRepository.markAllAsRead({
      tenantId,
      userId,
      mealSessionId,
    });

    return null;
  }

  async delete(
    id: number,
    { tenantId, userId, mealSessionId }: INotificationContext,
  ) {
    await this.findById(id, { tenantId, userId, mealSessionId });

    await notificationRepository.remove(id, {
      tenantId,
      userId,
      mealSessionId,
    });

    return null;
  }
}

export const notificationService = new NotificationService();
