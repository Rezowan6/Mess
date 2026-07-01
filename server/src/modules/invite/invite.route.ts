import express from "express";

import { auth, tenantMiddleware, role } from "@/middlewares/index.js";
import * as invitesController from "./invite.controller.js";

const router = express.Router();

const adminAccess = [auth, tenantMiddleware, role("admin")];

router.post("/", ...adminAccess, invitesController.invite);

export default router;
