import { NextFunction, Request, Response } from "express";

import { ApiError } from "@/utils/ApiError.js";

export type UserRole =
  | "systemOwner"
  | "admin"
  | "user"
  | "subAdmin"
  | "messMalik";

export const role = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!roles.includes(req.user.role as UserRole)) {
      throw new ApiError(403, "You don't have permission");
    }

    next();
  };
};
