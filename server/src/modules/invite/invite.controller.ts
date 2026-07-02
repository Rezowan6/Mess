import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import * as inviteService from "./invite.service.js";
import { inviteSchema } from "./invite.validation.js";

export const invite = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const data = inviteSchema.parse(req.body);

  const { data: inviteData, message } = await inviteService.invite({
    ...data,
    tenantId: user.tenantId,
    createdBy: user.id,
  });

  res.status(200).json(new ApiResponse(201, message, inviteData));
});

export const validate = asyncHandler(async (req: Request, res: Response) => {
  const token = req.params.token;
  console.log(token)

  const { invite, message } = await inviteService.validate(token);

  res.status(200).json(new ApiResponse(201, message, invite));
});

export const accept = asyncHandler(async (req: Request, res: Response) => {
  const {token, password } = req.body;

  const { user, message } = await inviteService.accept(token, password);

  res.status(200).json(new ApiResponse(201, message, user));
});

export const cancel = asyncHandler(async (req: Request, res: Response) => {

  const inviteId = Number(req.params.id);
  const tenantId = req.user.tenantId;

  const { message } = await inviteService.cancel(inviteId, tenantId);

  res.status(200).json(new ApiResponse(200, message, null));
});

// export const resend = asyncHandler(async (req: Request, res: Response) => {
//   const {token, password } = req.body;

//   const { user, message } = await inviteService.accept(token, password);

//   res.status(200).json(new ApiResponse(201, message, user));
// });
