import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiResponse, cookieOptions } from "@/utils/index.js";
import { Request, Response } from "express";
import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, message } = await authService.register(req.body);

  res.status(201).json(new ApiResponse(201, message, user));
});

export const verify = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;

  const { message } = await authService.verify(token);

  res.status(201).json(new ApiResponse(201, message, null));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { data, message, refreshToken } = await authService.login({
    ...req.body,
    ip: req,
    userAgent: req.headers["user-agent"],
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json(new ApiResponse(201, message, data));
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    const { accessToken } = await authService.refreshToken(token);

    res.status(200).json(
      new ApiResponse(200, "Token refreshed", {
        accessToken,
      }),
    );
  },
);

// logout
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const { message } = await authService.logout(refreshToken);

  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json(new ApiResponse(201, message, null));
});
