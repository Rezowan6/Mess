import { env } from "@/configs/env.js";
import { User } from "@/models/index.js";
import { ApiError, verifyToken } from "@/utils/index.js";
import asyncHandler from "./asyncHandler.js";

export const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Access token missing");
  }

  const token = authHeader.split(" ")[1];

  const decoded  = verifyToken(token!, env.ACCESS_TOKEN_SECRET);

  const user = await User.findByPk(decoded.id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;

  next();
});
