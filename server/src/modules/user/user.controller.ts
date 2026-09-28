import { getTenantContext } from "@/helpers/getTenantContext.helper.js";
import asyncHandler from "@/middlewares/asyncHandler.js";
import { ApiError } from "@/utils/ApiError.js";
import { deleteImage, uploadImage } from "@/utils/cloudinary.util.js";
import { logger } from "@/utils/logger.js";
import { sendResponse } from "@/utils/sendResponse.utils.js";
import { Request, Response } from "express";
import { userService } from "./user.service.js";

class UserController {
  updateAvatar = asyncHandler(async (req: Request, res: Response) => {
    const { userId, tenantId, } = getTenantContext(req);

    if (!req.file) {
      throw new ApiError(400, "Avatar image is required");
    }

    const user = await userService.getUserById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    let newAvatarPublicId: string | null = null;

    try {
      // Upload new avatar to Cloudinary
      const result = await uploadImage(
        req.file.buffer,
        "mess-management/avatars",
      );

      const newAvatar = result.secure_url;
      newAvatarPublicId = result.public_id;

      // Update database
      const updatedUser = await userService.updateAvatar(
        tenantId,
        userId,
        newAvatar,
        newAvatarPublicId,
      );

      // Delete old avatar from Cloudinary
      if (user.avatarPublicId) {
        try {
          await deleteImage(user.avatarPublicId);
        } catch (error) {
          logger.error(
            {
              error,
              userId,
              publicId: user.avatarPublicId,
            },
            "Failed to delete old avatar from Cloudinary",
          );
        }
      }

      return sendResponse(res, {
        statusCode: 200,
        message: "Avatar updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      // Rollback newly uploaded image if DB update fails
      if (newAvatarPublicId) {
        try {
          await deleteImage(newAvatarPublicId);
        } catch (cleanupError) {
          logger.error(
            {
              error: cleanupError,
              userId,
              publicId: newAvatarPublicId,
            },
            "Failed to cleanup new avatar from Cloudinary",
          );
        }
      }

      throw error;
    }
  });
}

export const userController = new UserController();
