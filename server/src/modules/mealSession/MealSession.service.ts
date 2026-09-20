import { ApiError } from "@/utils/ApiError.js";
import { getCurrentMonthAndYear } from "@/utils/date.util.js";
import { UniqueConstraintError } from "sequelize";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";
import {
  ICompletedMealSession,
  MealSessionStatus,
} from "./mealSession.interface.js";
import { mealSessionRepository } from "./mealSession.repository.js";

class MealSessionService {
  async create(tenantId: number, userId: number) {
    const { month, year } = getCurrentMonthAndYear();

    const activeSession =
      await mealSessionRepository.getCurrentSession(tenantId);

    if (activeSession) {
      throw new ApiError(409, "A meal session is already open");
    }

    const sessionNumber = await mealSessionRepository.getNextSessionNumber(
      tenantId,
      year,
      month,
    );

    try {
      return await mealSessionRepository.create({
        tenantId,
        month,
        year,
        sessionNumber,
        status: MealSessionStatus.OPEN,
        openedBy: userId,
        openedAt: new Date(),
      });
    } catch (error) {
      // দুটো request একসাথে এলে DB-র unique index দ্বিতীয়টা আটকায়
      if (error instanceof UniqueConstraintError) {
        throw new ApiError(409, "A meal session is already open");
      }
      throw error;
    }
  }

  async getCurrentSession(tenantId: number) {
    const session = await mealSessionRepository.getCurrentSession(tenantId);

    if (!session) {
      throw new ApiError(404, "No active meal session found.");
    }

    return session;
  }

  async getAll(tenantId: number) {
    return mealSessionRepository.findAll({
      where: { tenantId },
    });
  }

  async getCompletedSessions(
    tenantId: number,
  ): Promise<ICompletedMealSession[]> {
    const sessions = await mealSessionRepository.getCompletedSessions(tenantId);

    return sessions.map((session) => ({
      id: session.id,
      month: session.month,
      status: session.status,
      year: session.year,
      sessionNumber: session.sessionNumber,
      openedAt: session.openedAt ?? null,
      closedAt: session.closedAt ?? null,
    }));
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

    const [affectedRows] = await mealSessionRepository.closeSession(
      sessionId,
      tenantId,
      userId,
    );

    if (affectedRows === 0) {
      throw new ApiError(409, "Meal session is no longer open.");
    }

    return mealSessionRepository.findById(sessionId);
  }
}

export const mealSessionService = new MealSessionService();
