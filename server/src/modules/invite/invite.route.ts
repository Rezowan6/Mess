import express from "express";

import { auth, contextMiddleware, role } from "@/middlewares/index.js";
import * as invitesController from "./invite.controller.js";

const router = express.Router();

const adminAccess = [auth, contextMiddleware, role("admin")];

router.post("/send", ...adminAccess, invitesController.send);
// router.get("/accept/:token", ...adminAccess, invitesController.validate);
// router.post("/accept", ...adminAccess, invitesController.accept);
// router.post("/:id/cancel", ...adminAccess, invitesController.cancel);
// router.post("/:id/resend", ...adminAccess, invitesController.resend);

export default router;
