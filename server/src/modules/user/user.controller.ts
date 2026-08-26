import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import { ApiError } from "@/utils/ApiError.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { userService } from "./user.service.js";

class UserController {
  async updateAvatar(req: Request, res: Response) {
    const { userId } = getTenantContext(req);
    if (!req.file) {
      throw new ApiError(400, "Avatar image is required");
    }

    const avatar = `/uploads/avatars/${req.file.filename}`;

    const user = await userService.updateAvatar(userId, avatar);

    return sendResponse(res, {
      statusCode: 200,
      message: "Avatar updated successfully",
      data: user,
    });
  }
}

export const userController = new UserController();
