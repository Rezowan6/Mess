import { NextFunction, Request, Response } from "express";

import { ApiError } from "@/utils/ApiError.js";

export const systemOwner = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.context.user?.role !== "systemOwner") {
    throw new ApiError(403, "System owner access required.");
  }

  next();
};
