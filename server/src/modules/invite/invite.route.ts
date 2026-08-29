import express from "express";

import { adminAccess } from "@/helpers/permission.js";
import { inviteController } from "./invite.controller.js";

const router = express.Router();

router.post("/", ...adminAccess, inviteController.send);
router.post("/accept/:token", inviteController.accept);
router.post("/cancel", ...adminAccess, inviteController.cancel);
// router.post("/:id/resend", ...adminAccess, invitesController.resend);

// re_aR3rsFcM_4H3jzeWKtNrqnX2k84q6DnV3
export default router;
