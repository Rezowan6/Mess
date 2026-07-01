import express from "express";

import { auth, tenantMiddleware, role } from "@/middlewares/index.js";
import * as invitesController from "./invite.controller.js";

const router = express.Router();

const adminAccess = [auth, tenantMiddleware, role("admin")];

router.post("/", ...adminAccess, invitesController.invite);
router.get("/accept/:token", ...adminAccess, invitesController.validate);
router.post("/accept", ...adminAccess, invitesController.accept);
// router.post("/:id/cancel", ...adminAccess, invitesController.cancel);
// router.post("/:id/resend", ...adminAccess, invitesController.resend);

export default router;
