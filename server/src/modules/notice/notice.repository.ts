import { BaseRepository } from "@/common/repo/base.repository.js";
import { Notice } from "@/models/index.js";

class NoticeRepository extends BaseRepository<Notice> {
  constructor() {
    super(Notice);
  }

  async getAll(tenantId: number, mealSessionId: number) {
    return this.findAll({
      where: {
        tenantId,
        mealSessionId,
      },
      include: [
        {
          association: "creator",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async getById(id: number, tenantId: number, mealSessionId: number) {
    return this.findOneWithOptions({
      where: {
        id,
        tenantId,
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
}

export const noticeRepository = new NoticeRepository();
