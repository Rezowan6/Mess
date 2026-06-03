import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";
import User from "../models/users/UserModel.js";
import {env} from "../configs/env.js";

interface JwtPayload {
  id: string;
}

export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Not authorized, sorry!");
    }

    // Verify token
    let decoded: JwtPayload;

    try {
      decoded = verifyToken(
        token,
        env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;
    } catch (error: any) {
      throw new ApiError(401, error.message || "Invalid token");
    }

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "Authorization failed!");
    }

    // attach user to request
    req.user = user;

    next();
  }
);


type UserRole = "systemOwner" | "admin" |"user" | "subAdmin" | "messMalik";

export const authorizeRoles = (...roles: UserRole[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!roles.includes(req.user.role as UserRole)) {
      throw new ApiError(
        403,
        "You are not allowed to access this resource"
      );
    }

    next();
  };
};