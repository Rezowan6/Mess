import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { env } from "@/configs/env.js";

// register
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { data, message } = await authService.register(req.body);

  res.status(201).json(new ApiResponse(201, message, data));
});

// verity email
export const verify = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;

  const { user, message } = await authService.verify(token);

  res.status(201).json(new ApiResponse(201, message, user || null));
});

// login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { data, message, refreshToken } = await authService.login({
    ...req.body,
    ip: req,
    userAgent: req.headers["user-agent"],
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json(new ApiResponse(201, message, data));
});
