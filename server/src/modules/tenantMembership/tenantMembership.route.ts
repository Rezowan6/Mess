import { MemberRole } from "@/constans/index.js";
import { auth, contextMiddleware, role } from "@/middlewares/index.js";
import express from "express";
import { TenantMembershipController } from "./tenantMembership.controller.js";

const router = express.Router();

const managerAccess = [auth, contextMiddleware, role(MemberRole.ADMIN)];

router.get("/", ...managerAccess, TenantMembershipController.getMembers);

export default router;
