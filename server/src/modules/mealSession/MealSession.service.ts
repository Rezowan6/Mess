import sequelize from "@/configs/db.js";
import { ApiError } from "@/utils/ApiError.js";
import { MealSessionStatus } from "./mealSession.interface.js";
import { MealSessionRepository } from "./mealSession.repository.js";

export class MealSessionService {
  static async create(tenantId: number, userId: number) {
    const data = await sequelize.transaction(async (transaction) => {
      const findSession = {
        tenantId,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      };
      const exsistSession = await MealSessionRepository.findByTenantMonthYear(
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

      const session = await MealSessionRepository.create(
        { ...payload },
        transaction,
      );
      return session;
    });

    return data;
  }

  static async getCurrent(tenantId: number) {
    const session = await MealSessionRepository.findCurrentSession(tenantId);

    if (!session) {
      throw new ApiError(404, "No active meal session found.");
    }

    return session;
  }

  static async getAll(tenantId: number) {
    const session = await MealSessionRepository.findAllByTenant(tenantId);

    if (!session) {
      throw new ApiError(404, "No active meal session found.");
    }

    return session;
  }

  static async close(payload: {
    sessionId: number;
    tenantId: number;
    userId: number;
  }) {
    const { sessionId, tenantId, userId } = payload;

    const session = await MealSessionRepository.findById(sessionId);

    if (!session) {
      throw new ApiError(404, "Meal session not found.");
    }
    if (session.tenantId !== tenantId) {
      throw new ApiError(403, "You are not allowed to close this session");
    }

    if (session.status === MealSessionStatus.CLOSED) {
      throw new ApiError(400, "Meal session already closed.");
    }

    await MealSessionRepository.closeSession(sessionId, userId);

    return MealSessionRepository.findById(sessionId);
  }
}
