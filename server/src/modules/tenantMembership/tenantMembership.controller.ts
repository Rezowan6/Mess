import { asyncHandler } from "@/middlewares/index.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { TenantMembershipService } from "./tenantMembership.service.js";

export class TenantMembershipController {
  static getMembers = asyncHandler(async (req: Request, res: Response) => {
    const tenantId = req.context.tenant.id;

    const members = await TenantMembershipService.getMembers(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Members fetched successfully",
      data: members,
    });
  });
}
