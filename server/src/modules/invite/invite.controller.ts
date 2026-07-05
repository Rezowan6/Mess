import { Request, Response } from "express";

import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiResponse } from "@/utils/ApiResponse.js";
import { getParamString } from "@/utils/index.js";
import * as inviteService from "./invite.service.js";

export const send = asyncHandler(async (req: Request, res: Response) => {
  const { invite, message } = await inviteService.send({
    email: req.body.email,
    context: req.context,
  });

  res.status(201).json(new ApiResponse(201, message, invite));
});

// export const validate = asyncHandler(async (req: Request, res: Response) => {
//   const token = req.params.token;

//   const { invite, message } = await inviteService.validate(token);

//   res.status(200).json(new ApiResponse(201, message, invite));
// });

export const accept = asyncHandler(async (req: Request, res: Response) => {
  const token = getParamString(req.params.token);
  const {name, password} = req.body;

  const { user, message } = await inviteService.accept({token, name, password });

  res.status(200).json(new ApiResponse(201, message, user));
});

// export const cancel = asyncHandler(async (req: Request, res: Response) => {
//   const inviteId = Number(req.params.id);
//   const tenantId = req.user.tenantId;

//   const { message } = await inviteService.cancel(inviteId, tenantId);

//   res.status(200).json(new ApiResponse(200, message, null));
// });

// export const resend = asyncHandler(async (req: Request, res: Response) => {
//   const inviteId = Number(req.params.id);
//   const tenantId = req.user.tenantId;

//   const { message } = await inviteService.resend(inviteId, tenantId);

//   res.status(200).json(new ApiResponse(201, message, null));
// });
