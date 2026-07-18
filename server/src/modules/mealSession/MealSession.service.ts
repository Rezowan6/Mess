import { ApiError } from "@/utils/ApiError.js";
import { getCurrentMonthAndYear } from "@/utils/date.util.js";
import { MealSessionStatus } from "./mealSession.interface.js";
import { mealSessionRepository } from "./mealSession.repository.js";

class MealSessionService {
  async create(tenantId: number, userId: number) {
    const { month, year } = getCurrentMonthAndYear();

    const exsistSession = await mealSessionRepository.exists({
      tenantId,
      month,
      year,
    });
    if (exsistSession) {
      throw new ApiError(409, "Meal session already exists");
    }

    return await mealSessionRepository.create({
      tenantId,
      month,
      year,
      openedBy: userId,
      openedAt: new Date(),
    });
  }

  async getCurrentSession(tenantId: number) {
    const session = await mealSessionRepository.getCurrentSession(tenantId);

    if (!session) {
      throw new ApiError(404, "No active meal session found.");
    }

    return session;
  }

  async getAll(tenantId: number) {
    const session = await mealSessionRepository.findAll({
      where: { tenantId },
    });

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

    const isExists = await mealSessionRepository.findOne({ id: sessionId });

    if (!isExists) {
      throw new ApiError(404, "Meal session not found.");
    }
    if (isExists.tenantId !== tenantId) {
      throw new ApiError(403, "You are not allowed to close this session");
    }

    if (isExists.status === MealSessionStatus.CLOSED) {
      throw new ApiError(400, "Meal session already closed.");
    }

    await mealSessionRepository.closeSession(sessionId, userId);

    return mealSessionRepository.findById(sessionId);
  }
}

export const mealSessionService = new MealSessionService();
