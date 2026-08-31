import { allAccess } from "@/helpers/permission.js";
import { uploadAvatar } from "@/middlewares/uploadAvatar.middleware.js";
import express from "express";
import { userController } from "../user/user.controller.js";
import { myProfileController } from "./myProfile.controller.js";

const router = express.Router();

router.get("/", ...allAccess, myProfileController.getMyProfile);

router.patch(
  "/avatar",
  ...allAccess,
  uploadAvatar.single("avatar"),
  userController.updateAvatar,
);

export default router;
