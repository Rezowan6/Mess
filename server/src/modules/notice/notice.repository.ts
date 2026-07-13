import { Notice } from "@/models/index.js";

export class NoticeRepository {
  async create(payload: any) {
    return Notice.create(payload);
  }

  async getAll(tenantId: number, mealSessionId: number) {
    return Notice.findAll({
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

  async getById(id: number, tenantId: number, mealSessionId: number,) {
    return Notice.findOne({
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

  async update(id: number, tenantId: number,mealSessionId: number, payload: Partial<any>) {
    await Notice.update(payload, {
      where: {
        id,
        tenantId,
        mealSessionId,
      },
    });

    return this.getById(id, tenantId, mealSessionId);
  }

  async delete(id: number, tenantId: number, mealSessionId: number) {
    return Notice.destroy({
      where: {
        id,
        tenantId,
        mealSessionId,
      },
    });
  }
}
