import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiResponse, cookieOptions } from "@/utils/index.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { authService } from "./auth.service.js";

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const data = await authService.register(req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "",
      data,
    });
  });

  verify = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;

    const data = await authService.verify(token);

    sendResponse(res, {
      statusCode: 201,
      message: "Email verified successfully",
      data,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
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

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    const { accessToken } = await authService.refreshToken(token);

    res.status(200).json(
      new ApiResponse(200, "Token refreshed", {
        accessToken,
      }),
    );
  });

  // logout
  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const { message } = await authService.logout(refreshToken);

    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json(new ApiResponse(201, message, null));
  });

  me = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const user = await authService.getMe(userId);

    res
      .status(200)
      .json(new ApiResponse(200, "User fetched successfully", user));
  });
}

export const authController = new AuthController();
