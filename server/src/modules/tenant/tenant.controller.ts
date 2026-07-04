import { NextFunction, Request, Response } from "express";

import { asyncHandler } from "@/middlewares/index.js";
import { ApiResponse } from "@/utils/index.js";
import * as TenantService from "./tenant.service.js";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const { data, message } = await TenantService.create(userId, req.body);

  res.status(201).json(new ApiResponse(201, message, data));
});

