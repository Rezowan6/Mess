import { BaseRepository } from "@/common/repo/base.repository.js";
import { MealSession } from "@/models/index.js";
import { MealSessionStatus } from "./mealSession.interface.js";

export class MealSessionRepository extends BaseRepository<MealSession> {
  constructor() {
    super(MealSession);
  }

  async getCurrentSession(tenantId: number) {
    return await this.findOne({
      tenantId,
      status: MealSessionStatus.OPEN,
    });
  }

  async closeSession(id: number, tenantId: number, userId: number) {
    return this.update(
      { id, tenantId, status: MealSessionStatus.OPEN },
      {
        status: MealSessionStatus.CLOSED,
        closedBy: userId,
        closedAt: new Date(),
      },
    );
  }

  async getCompletedSessions(tenantId: number) {
    return this.findAll({
      where: { tenantId },
      attributes: [
        "id",
        "month",
        "year",
        "status",
        "sessionNumber",
        "openedAt",
        "closedAt",
      ],
      order: [
        ["year", "DESC"],
        ["month", "DESC"],
        ["sessionNumber", "DESC"],
        ["id", "DESC"],
      ],
    });
  }

  async getNextSessionNumber(tenantId: number, year: number, month: number) {
    const max = await this.model.max("sessionNumber", {
      where: { tenantId, year, month },
      paranoid: false, // soft-delete করা session-এর নম্বরও ধরতে হবে
    });

    return (Number(max) || 0) + 1;
  }
}

export const mealSessionRepository = new MealSessionRepository();
