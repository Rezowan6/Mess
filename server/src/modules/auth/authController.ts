import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import * as authService from "./authService.js";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export const register = asyncHandler(
  async (
    req: Request<{}, {}, RegisterBody>,
    res: Response
  ): Promise<void> => {
    const { name, email, password } = req.body;

    const message = await authService.register({
      name,
      email,
      password,
    });

    res.status(201).json(
      new ApiResponse(201, message, null)
    );
  }
);