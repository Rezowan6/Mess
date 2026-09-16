import { BaseRepository } from "@/common/repo/base.repository.js";
import { Notification, User } from "@/models/index.js";

import { IPaginationQuery } from "@/types/pagination.interface.js";

class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super(Notification);
  }

  async getAll(tenantId: number, userId: number, pagination: IPaginationQuery) {
    return this.paginate(
      {
        where: {
          tenantId,
          userId,
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

  async getById(id: number, tenantId: number, userId: number) {
    return this.findOneWithOptions({
      where: {
        id,
        tenantId,
        userId,
      },

      include: [
        {
          association: "creator",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
    });
  }

  async getUnreadCount(tenantId: number, userId: number) {
    return this.count({
      where: {
        tenantId,
        userId,
        isRead: false,
      },
    });
  }

  async markAsRead(id: number, tenantId: number, userId: number) {
    return this.update(
      {
        id,
        tenantId,
        userId,
      },
      {
        isRead: true,
      },
    );
  }

  async markAllAsRead(tenantId: number, userId: number) {
    return this.update(
      {
        tenantId,
        userId,
        isRead: false,
      },
      {
        isRead: true,
      },
    );
  }

  async remove(id: number, tenantId: number, userId: number) {
    return this.delete(
      {
        id,
        tenantId,
        userId,
      },
      {
        force: true,
      },
    );
  }
}

export const notificationRepository = new NotificationRepository();
