import { Request, Response } from "express";

import { asyncHandler } from "@/middlewares/index.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { tenantService } from "./tenant.service.js";

class TenantController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.context.user;

    const data = await tenantService.create(id, req.body);

    sendResponse(res, {
      statusCode: 201,
      message: "Tenant create successfully",
      data,
    });
  });
}

export const tenantController = new TenantController();
