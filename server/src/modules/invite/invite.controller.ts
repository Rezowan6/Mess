import { Request, Response } from "express";

import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { getParamString } from "@/utils/index.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { inviteService } from "./invite.service.js";

class InviteController {
  send = asyncHandler(async (req: Request, res: Response) => {
    const context = getTenantContext(req);

    const data = await inviteService.send({
      email: req.body.email,
      context,
    });

    return sendResponse(res, {
      statusCode: 201,
      message: "Invite send successfully.",
      data,
    });
  });

  accept = asyncHandler(async (req: Request, res: Response) => {
    const context = getTenantContext(req);
    const token = getParamString(req.params.token);
    const { name, password } = req.body;

    const data = await inviteService.accept({
      token,
      name,
      password,
      context,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Invitation accepted successfully.",
      data,
    });
  });

  cancel = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, userId } = getTenantContext(req);
    const id = req.body.inviteId;

    const data = await inviteService.cancel({
      id,
      tenantId,
      userId,
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Invite cancelled successfully.",
      data,
    });
  });
}

export const inviteController = new InviteController();

// export const resend = asyncHandler(async (req: Request, res: Response) => {
//   const inviteId = Number(req.params.id);
//   const tenantId = req.user.tenantId;

//   const { message } = await inviteService.resend(inviteId, tenantId);

//   res.status(200).json(new ApiResponse(201, message, null));
// });
