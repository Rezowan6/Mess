import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import * as inviteService from "./invite.service.js";
import { inviteSchema } from "./invite.validation.js";

export const invite = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const data = inviteSchema.parse(req.body);

  const {data: inviteData, message} = await inviteService.invite({
    ...data,
    tenantId: user.tenantId,
    createdBy: user.id,
  });

  res.status(200).json(new ApiResponse(201, message, inviteData));
});
