import express from "express";

import { auth, contextMiddleware, role } from "@/middlewares/index.js";
import * as invitesController from "./invite.controller.js";

const router = express.Router();

const adminAccess = [auth, contextMiddleware, role("admin")];

router.post("/", ...adminAccess, invitesController.send);
router.post("/accept/:token", invitesController.accept);
router.post("/cancel", ...adminAccess, invitesController.cancel);
// router.post("/:id/resend", ...adminAccess, invitesController.resend);
// router.get("/validate/:token", ...adminAccess, invitesController.validate);

export default router;
