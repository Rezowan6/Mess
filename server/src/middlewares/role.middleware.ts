import { NextFunction, Request, Response } from "express";

import { ApiError } from "@/utils/ApiError.js";

export type MemberShipRole =
  | "systemOwner"
  | "admin"
  | "member"
  | "manager"
  | "messMalik";

export const role = (...roles: MemberShipRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.context.membership) {
      throw new ApiError(401, "Membership not found.");
    }

    if (!roles.includes(req.context.membership.role as MemberShipRole)) {
      throw new ApiError(403, "You don't have permission.");
    }

    next();
  };
};
