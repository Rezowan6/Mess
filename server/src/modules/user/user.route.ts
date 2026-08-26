import { uploadAvatar } from "@/common/middleware/upload.middleware.js";
import { allAccess } from "@/helpers/permission.js";
import express from "express";
import { userController } from "./user.controller.js";

const router = express.Router();

router.patch(
  "/avatar",
  ...allAccess,
  uploadAvatar.single("avatar"),
  userController.updateAvatar,
);
export default router;
