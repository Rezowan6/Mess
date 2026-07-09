import sequelize from "@/configs/db.js";
import { ApiError } from "@/utils/ApiError.js";
import { MealSessionStatus } from "./mealSession.interface.js";
import { MealSessionRepository } from "./mealSession.repository.js";

export class MealSessionService {
  constructor(private readonly mealSessionRepository: MealSessionRepository){};
   async create(tenantId: number, userId: number) {
    const data = await sequelize.transaction(async (transaction) => {
      const findSession = {
        tenantId,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      };
      const exsistSession = await this.mealSessionRepository.findByTenantMonthYear(
        { ...findSession },
        transaction,
      );
      if (exsistSession) {
        throw new ApiError(409, "Meal session already exists");
      }
      const payload = {
        tenantId,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        openedBy: userId,
        openedAt: new Date(),
      };

      const session = await this.mealSessionRepository.create(
        { ...payload },
        transaction,
      );
      return session;
    });

    return data;
  }

   async getCurrent(tenantId: number) {
    const session = await this.mealSessionRepository.getCurrentSession(tenantId);

    if (!session) {
      throw new ApiError(404, "No active meal session found.");
    }

    return session;
  }

   async getAll(tenantId: number) {
    const session = await this.mealSessionRepository.getAllByTenant(tenantId);

    if (!session) {
      throw new ApiError(404, "No active meal session found.");
    }

    return session;
  }

   async close(payload: {
    sessionId: number;
    tenantId: number;
    userId: number;
  }) {
    const { sessionId, tenantId, userId } = payload;

    const session = await this.mealSessionRepository.findById(sessionId);

    if (!session) {
      throw new ApiError(404, "Meal session not found.");
    }
    if (session.tenantId !== tenantId) {
      throw new ApiError(403, "You are not allowed to close this session");
    }

    if (session.status === MealSessionStatus.CLOSED) {
      throw new ApiError(400, "Meal session already closed.");
    }

    await this.mealSessionRepository.closeSession(sessionId, userId);

    return this.mealSessionRepository.findById(sessionId);
  }
}
