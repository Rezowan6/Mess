import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { revokeRefreshToken } from "./refreshToken.service.js";
import { cookieOptions } from "@/utils/cookie.util.js";

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  await revokeRefreshToken(refreshToken);

  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({
    success: true,

    message: "Logout successful",
  });
});
