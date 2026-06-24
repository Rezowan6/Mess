import { NextFunction, Request, Response } from "express";

import { env } from "@/configs/env.js";
import User from "@/modules/user/user.model.js";
import { ApiError } from "@/utils/ApiError.js";
import { verifyToken } from "@/utils/jwt.util.js";
import asyncHandler from "./asyncHandler.js";

interface JwtPayload {
  id: number;

  tenantId?: number;

  role: string;
}

export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Access token missing");
    }

    let decoded: JwtPayload;

    try {
      decoded = verifyToken(token, env.ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (error: any) {
      throw new ApiError(401, "Invalid or expired token");
    }

    const user = await User.findOne({
      where: {
        id: decoded.id,
      },

      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    // attach user

    req.user = user;

    next();
  },
);
