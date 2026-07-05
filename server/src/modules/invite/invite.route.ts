import express from "express";

import { auth, contextMiddleware, role } from "@/middlewares/index.js";
import * as invitesController from "./invite.controller.js";

const router = express.Router();

const adminAccess = [auth, contextMiddleware, role("admin")];

router.post("/send", ...adminAccess, invitesController.send);
router.post("/accept/:token", ...adminAccess, invitesController.accept);
// router.get("/validate/:token", ...adminAccess, invitesController.validate);
// router.post("/:id/cancel", ...adminAccess, invitesController.cancel);
// router.post("/:id/resend", ...adminAccess, invitesController.resend);

export default router;
