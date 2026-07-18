import express from "express";

import { adminAccess } from "@/helpers/permission.js";
import { inviteController } from "./invite.controller.js";

const router = express.Router();

router.post("/", ...adminAccess, inviteController.send);
router.post("/accept/:token", ...adminAccess, inviteController.accept);
router.post("/cancel", ...adminAccess, inviteController.cancel);
// router.post("/:id/resend", ...adminAccess, invitesController.resend);

export default router;
