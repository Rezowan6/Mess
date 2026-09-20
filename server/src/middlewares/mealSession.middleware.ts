import { HEADERS } from "@/constans/index.js";

import { mealSessionRepository } from "@/modules/mealSession/mealSession.repository.js";

import { ApiError } from "@/utils/index.js";

import type { NextFunction, Request, Response } from "express";

export const mealSessionMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const mealSessionIdHeader = req.get(HEADERS.MEAL_SESSION_ID);

  const mealSessionId = Number(mealSessionIdHeader);

  if (
    !mealSessionIdHeader ||
    !Number.isInteger(mealSessionId) ||
    mealSessionId <= 0
  ) {
    throw new ApiError(400, "Valid Meal Session ID is required.");
  }

  const tenantId = req.context.membership?.tenantId;

  if (!tenantId) {
    throw new ApiError(400, "Tenant context missing.");
  }

  const mealSession = await mealSessionRepository.findById(mealSessionId);

  if (!mealSession) {
    throw new ApiError(404, "Meal session not found.");
  }

  /*
   * Critical multi-tenant security check.
   *
   * Never trust the Meal Session ID from the client.
   * Make sure the session belongs to the current tenant.
   */
  if (mealSession.tenantId !== tenantId) {
    throw new ApiError(403, "Meal session does not belong to this tenant.");
  }

  /*
   * Dashboard/history/report APIs may need CLOSED sessions.
   *
   * Therefore do NOT force OPEN here.
   */
  req.context.mealSession = mealSession;

  next();
};
