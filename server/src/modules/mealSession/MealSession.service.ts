import { ApiError } from "@/utils/ApiError.js";
import { getCurrentMonthAndYear } from "@/utils/date.util.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";
import { MealSessionStatus } from "./mealSession.interface.js";
import { mealSessionRepository } from "./mealSession.repository.js";

class MealSessionService {
  async create(tenantId: number, userId: number) {
    const { month, year } = getCurrentMonthAndYear();

    const activeSession =
      await mealSessionRepository.getCurrentSession(tenantId);

    if (activeSession) {
      throw new ApiError(409, "A meal session is already open");
    }

    return await mealSessionRepository.create({
      tenantId,
      month,
      year,
      status: MealSessionStatus.OPEN,
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

    const isExists = await mealSessionRepository.findOne({
      id: sessionId,
      tenantId,
    });

    if (!isExists) {
      throw new ApiError(404, "Meal session not found.");
    }

    if (isExists.status === MealSessionStatus.CLOSED) {
      throw new ApiError(400, "Meal session already closed.");
    }

    const pendingMealReq = await mealRequestRepository.hasPendingRequests(
      tenantId,
      sessionId,
    );

    if (pendingMealReq) {
      throw new ApiError(
        400,
        "Approve or reject all meal requests before closing session.",
      );
    }

    await mealSessionRepository.closeSession(sessionId, tenantId, userId);

    return mealSessionRepository.findById(sessionId);
  }
}

export const mealSessionService = new MealSessionService();
