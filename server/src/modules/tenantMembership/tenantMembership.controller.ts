import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import { asyncHandler } from "@/middlewares/index.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { TenantMembershipService } from "./tenantMembership.service.js";

export class TenantMembershipController {
  static getMembers = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const members = await TenantMembershipService.getMembers(tenantId);

    return sendResponse(res, {
      statusCode: 200,
      message: "Members fetched successfully",
      data: members,
    });
  });

  static updateRole = asyncHandler(async (req: Request, res: Response) => {

    const { tenantId, membershipId, role: currentRole } = getTenantContext(req);
    
    const targetMembershipId = Number(req.params.id);
    const { role } = req.body;

    const members = await TenantMembershipService.updateRole({
      tenantId,
      currentMembershipId: membershipId,
      currentRole,
      targetMembershipId,
      newRole: role,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Members role update successfully",
      data: members,
    });
  });

}
