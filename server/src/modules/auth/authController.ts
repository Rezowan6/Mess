import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import { Request, Response } from "express";
import * as authService from "./auth.service.js";

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
  const { data, message } = await authService.login({
    ...req.body,
    ip: req,
    userAgent: req.headers["user-agent"],
  });

  res.status(201).json(new ApiResponse(201, message, data));
});
