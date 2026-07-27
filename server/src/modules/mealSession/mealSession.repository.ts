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
      { id, tenantId },
      {
        status: MealSessionStatus.CLOSED,
        closedBy: userId,
        closedAt: new Date(),
      },
    );
  }
}

export const mealSessionRepository = new MealSessionRepository();
