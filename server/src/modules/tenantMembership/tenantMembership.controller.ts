import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import { asyncHandler } from "@/middlewares/index.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { membershipService } from "./tenantMembership.service.js";
import { IPaginationQuery } from "@/common/types/pagination.interface.js";

export class TenantMembershipController {
  getMembers = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId } = getTenantContext(req);

    const query = req.query as IPaginationQuery;

    const members = await membershipService.getMembers(tenantId, query);

    return sendResponse(res, {
      statusCode: 200,
      message: "Members fetched successfully",
      data: members.data,
      meta: members.meta,
    });
  });

  updateRole = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, membershipId, role: currentRole } = getTenantContext(req);

    const id = Number(req.params.id);
    const { role } = req.body;

    const members = await membershipService.updateRole({
      tenantId,
      currentMembershipId: membershipId,
      currentRole,
      id,
      role,
    });

    return sendResponse(res, {
      statusCode: 200,
      message: "Members role update successfully",
      data: members,
    });
  });

  deleteMember = asyncHandler(async (req: Request, res: Response) => {
    const { tenantId, membershipId, role } = getTenantContext(req);
    const targetMembershipId = Number(req.params.id);

    await membershipService.deleteMember({
      tenantId,
      currentMembershipId: membershipId,
      currentRole: role,
      targetMembershipId,
    });
    return sendResponse(res, {
      statusCode: 200,
      message: "Members remove successfully",
      data: null,
    });
  });
}

export const membershipController = new TenantMembershipController();
