import { BaseRepository } from "@/common/repo/base.repository.js";
import { Notification, User } from "@/models/index.js";

import {
  INotificationContext,
  INotificationPaginationContext,
} from "./notification.interface.js";

class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super(Notification);
  }

  async getAll({
    tenantId,
    userId,
    mealSessionId,
    pagination,
  }: INotificationPaginationContext) {
    return this.paginate(
      {
        where: {
          tenantId,
          userId,
          mealSessionId,
        },

        include: [
          {
            model: User,
            association: "creator",
            attributes: ["id", "name", "email", "avatar"],
          },
        ],

        order: [["createdAt", "DESC"]],
      },
      pagination,
    );
  }

  async getById(
    id: number,
    { tenantId, userId, mealSessionId }: INotificationContext,
  ) {
    return this.findOneWithOptions({
      where: {
        id,
        tenantId,
        userId,
        mealSessionId,
      },

      include: [
        {
          association: "creator",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
    });
  }

  async getUnreadCount({
    tenantId,
    userId,
    mealSessionId,
  }: INotificationContext) {
    return this.count({
      where: {
        tenantId,
        userId,
        mealSessionId,
        isRead: false,
      },
    });
  }

  async markAsRead(
    id: number,
    { tenantId, userId, mealSessionId }: INotificationContext,
  ) {
    return this.update(
      {
        id,
        tenantId,
        userId,
        mealSessionId,
      },
      {
        isRead: true,
      },
    );
  }

  async markAllAsRead({
    tenantId,
    userId,
    mealSessionId,
  }: INotificationContext) {
    return this.update(
      {
        tenantId,
        userId,
        mealSessionId,
        isRead: false,
      },
      {
        isRead: true,
      },
    );
  }

  async remove(
    id: number,
    { tenantId, userId, mealSessionId }: INotificationContext,
  ) {
    return this.delete(
      {
        id,
        tenantId,
        userId,
        mealSessionId,
      },
      {
        force: true,
      },
    );
  }
}

export const notificationRepository = new NotificationRepository();
