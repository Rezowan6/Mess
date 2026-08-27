import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiError } from "@/utils/ApiError.js";
import { logger } from "@/utils/logger.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { userService } from "./user.service.js";

class UserController {
  updateAvatar = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = getTenantContext(req);

    if (!req.file) {
      throw new ApiError(400, "Avatar image is required");
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const oldAvatar = user.avatar;
    const newAvatar = `/uploads/avatars/${req.file.filename}`;

    try {
      await userService.updateAvatar(userId, newAvatar);

      if (oldAvatar) {
        const oldAvatarPath = path.join(
          process.cwd(),
          oldAvatar.replace(/^[/\\]+/, ""),
        );

        try {
          await fs.unlink(oldAvatarPath);
        } catch (error: any) {
          if (error.code !== "ENOENT") {
            logger.error(
              { error, userId, oldAvatar },
              "Failed to delete old avatar",
            );
          }
        }
      }
    } catch (error) {
      const newAvatarPath = path.join(
        process.cwd(),
        newAvatar.replace(/^[/\\]+/, ""),
      );

      try {
        await fs.unlink(newAvatarPath);
      } catch (cleanupError) {
        logger.error(
          { error: cleanupError, userId },
          "Failed to cleanup new avatar",
        );
      }

      throw error;
    }

    return sendResponse(res, {
      statusCode: 200,
      message: "Avatar updated successfully",
      data: {
        ...user.toJSON(),
        avatar: newAvatar,
      },
    });
  });
}

export const userController = new UserController();
