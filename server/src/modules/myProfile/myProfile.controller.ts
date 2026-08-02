import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { myProfileService } from "./myProfile.service.js";

class MyProfileController {
    getMyProfileInfo = asyncHandler(async (req: Request, res: Response) => {
        const {tenantId, userId, mealSessionId,} = getTenantContext(req);

        const data = await myProfileService.getMyProfileInfo({tenantId, userId, mealSessionId,});

        sendResponse(res, {
            statusCode: 201,
            message: "My Profile info retraive successfully.",
            data,
        })
    })
}

export const myProfileController = new MyProfileController();