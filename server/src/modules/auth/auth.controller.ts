import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import { cookieOptions } from "@/utils/cookie.util.js";
import { Request, Response } from "express";
import * as authService from "./auth.service.js";

// register
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, message } = await authService.register(req.body);

  res.status(201).json(new ApiResponse(201, message, user));
});

// verity email
export const verify = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;

  const { message } = await authService.verify(token);

  res.status(201).json(new ApiResponse(201, message, null));
});

// login
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

// logout
export const logout = asyncHandler(async (req: Request, res: Response) => {
const refreshToken = req.cookies.refreshToken;
  const { message, } = await authService.logout(refreshToken);

  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json(new ApiResponse(201, message, null));
});
